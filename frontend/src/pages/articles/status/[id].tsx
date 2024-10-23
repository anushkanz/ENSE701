import React, { useState, useEffect } from "react";
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

export const StatusArticle = () => {
  const [article, setArticle] = useState<Article>(initialState);
  const [selected, setSelected] = useState("");

  const params = useParams<{ id: string }>();
  console.log(params?.id);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelected(value); // Update selected status directly
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      // Update the status of the article
      await axios.put(`http://localhost:8082/api/articles/status/${params?.id}`, { status: selected });
      alert('Article status updated successfully!'); // Notify the user
    } catch (error: any) {
      console.error(error.response.data);
      alert('Failed to update the article status.'); // Notify on failure
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8082/api/articles/${params?.id}`);
        console.log(data);
        setArticle(data);
        setSelected(data?.status); // Set the initial selected state
      } catch (error: any) {
        console.error(error.response.data);
      }
    })();
  }, [params?.id]); // Add params.id as a dependency

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <div className="pb-12">
        <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Update Status for {article.title || ""} Article</h3>
          <a href="/articles" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Back to Articles</a>
          <a href="/logout" className="rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-red-800 duration-300">Logout</a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="status">Status</label>
            <select
              className="border border-gray-300 shadow p-3 w-full rounded"
              name="status"
              id="status"
              value={selected}
              onChange={handleChange}
            >
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
          </div>
          <div className="mb-5">
            <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusArticle;
