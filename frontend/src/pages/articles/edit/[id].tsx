import React, { useState, useRef, useEffect } from "react";
import {useNavigate } from "react-router";
import axios from "axios";
import { useParams } from 'next/navigation';

type Article = {
  _id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  summary: string;
  linked_discussion: string;
  status:string;
};

const initialState = { _id: "", title: "", authors: "", source: "", publication_year: "", doi: "", summary: "", linked_discussion: "" , status: ""};

export const EditArticleForm = () => {

  const [article, setArticle] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setArticle((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const params = useParams<{ id: string;}>()
  console.log(params.id)

  const handleSubmitAndRedirect = () => {
    const data = { article, params };

    try {
      axios.put(`http://localhost:8082/api/articles/${params.id}`, data);

    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8082/api/articles/${params.id}`);
        console.log(data);
        setArticle(data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    })();
  }, []);

  return (
    <><div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <div className="pb-12">
              <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
                  <h3 className="my-4 text-2xl font-semibold text-gray-700">Update {article.title || ""} Article</h3>
                  <a href="/articles" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Back to Articles</a>
              </div>
              <form onSubmit={handleSubmitAndRedirect}>
                  <div className="mb-5 hidden">
                      <label htmlFor="title">Status:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded"
                          type="text"
                          name="status"
                          id="status"
                          value={article.status || ""}
                          onChange={(event) => {
                              setStatus(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="title">Title:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="text"
                          name="title"
                          id="title"
                          value={article.title || ""}
                          onChange={(event) => {
                              setTitle(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="author">Authors:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="text"
                          name="authors"
                          id="authors"
                          value={article.authors || ""}
                          onChange={(event) => {
                              setAuthors(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="source">Source:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="text"
                          name="source"
                          id="source"
                          value={article.source || ""}
                          onChange={(event) => {
                              setSource(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="pubYear">Publication Year:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="number"
                          name="pubYear"
                          id="pubYear"
                          value={article.publication_year || ""}
                          onChange={(event) => {
                              setPubYear(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="doi">DOI:</label>
                      <input
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="text"
                          name="doi"
                          id="doi"
                          value={article.doi || ""}
                          onChange={(event) => {
                              setDoi(event.target.value);
                          } } />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="summary">Summary:</label>
                      <textarea
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          name="summary"
                          value={article.summary || ""}
                          onChange={(event) => setSummary(event.target.value)} />
                  </div>
                  <div className="mb-5">
                      <label htmlFor="linked_discussion">Linked discussion:</label>
                      <textarea
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          name="linked_discussion"
                          value={article.linked_discussion || ""}
                          onChange={(event) => setLinkedDiscussion(event.target.value)} />
                  </div>
                  <div className="mb-5">
                      <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg" type="submit">Submit</button>
                  </div>
              </form>
          </div>
      </div></>
  );
};
export default EditArticleForm;