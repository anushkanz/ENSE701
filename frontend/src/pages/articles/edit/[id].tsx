import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Ensure this is imported
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
  status: string;
};

const initialState: Article = { _id: "", title: "", authors: "", source: "", publication_year: "", doi: "", summary: "", linked_discussion: "", status: "" };

export const EditArticleForm = () => {
  const [article, setArticle] = useState<Article>(initialState);
  const params = useParams<{ id: string }>();
  //const navigate = useNavigate(); // Use useNavigate to redirect after submission

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    setArticle((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmitAndRedirect = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    try {
      // Send the updated article data without params
      await axios.put(`http://localhost:8082/api/articles/${params?.id}`, article);
      alert('Article updated successfully!'); // Notify the user of success
      //navigate("/articles"); // Redirect to the articles page
    } catch (error: any) {
      console.error(error.response.data);
      alert('Failed to update the article.'); // Notify the user of failure
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8082/api/articles/${params?.id}`);
        console.log(data);
        setArticle(data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    })();
  }, [params?.id]); // Add params.id to the dependency array

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <div className="pb-12">
        <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Update {article.title || ""} Article</h3>
          <a href="/articles" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Back to Articles</a>
          <a href="/logout" className="rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-red-800 duration-300">Logout</a>
        </div>
        <form onSubmit={handleSubmitAndRedirect}>
          <div className="mb-5 hidden">
            <label htmlFor="status">Status:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="text"
              name="status"
              id="status"
              value={article.status || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="title">Title:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="text"
              name="title"
              id="title"
              value={article.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="authors">Authors:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="text"
              name="authors"
              id="authors"
              value={article.authors || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="source">Source:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="text"
              name="source"
              id="source"
              value={article.source || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="publication_year">Publication Year:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="number"
              name="publication_year" // Ensure this matches the state
              id="publication_year"
              value={article.publication_year || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="doi">DOI:</label>
            <input
              className="border border-gray-300 shadow p-3 w-full rounded"
              type="text"
              name="doi"
              id="doi"
              value={article.doi || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="summary">Summary:</label>
            <textarea
              className="border border-gray-300 shadow p-3 w-full rounded"
              name="summary"
              id="summary" // Add id for better accessibility
              value={article.summary || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="linked_discussion">Linked discussion:</label>
            <textarea
              className="border border-gray-300 shadow p-3 w-full rounded"
              name="linked_discussion"
              id="linked_discussion" // Add id for better accessibility
              value={article.linked_discussion || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleForm;
