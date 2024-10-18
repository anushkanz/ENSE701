import React, { useState, useRef, useEffect } from "react";
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

export const StatusArticle = () => {

  const [article, setArticle] = useState(initialState);
  const [selected, setSelected] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setArticle((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const params = useParams<{ id: string;}>()
  console.log(params?.id)

  const handleSubmit = () => {
    const data = { article, params };
    try {
      axios.put(`http://localhost:8082/api/articles/status/${params?.id}`, data);

    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        
        const { data } = await axios.get(`http://localhost:8082/api/articles/${params?.id}`);
        console.log(data);
        setArticle(data);
        console.log(data?.status)
        setSelected(data?.status);
      } catch (error: any) {
        console.error(error.response.data);
      }
    })();
  }, []);

  return (
    <><div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <div className="pb-12">
              <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
                  <h3 className="my-4 text-2xl font-semibold text-gray-700">Update Status {article.title || ""} Article</h3>
                  <a href="/articles" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Back to Articles</a>
              </div>
              <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                            <label>Status</label>
                            <select className="border border-gray-300 shadow p-3 w-full rounded mb-" 
                            name="type" 
                            id="type"
                            value={selected}
                            onChange={(event) => {
                                handleChange
                            }}
                            >
                                <option key="0" value="0" >In Active</option>
                                <option key="1" value="1">Active</option>
                            </select>
                            
                    </div>
                  <div className="mb-5">
                      <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg" type="submit">Submit</button>
                  </div>
              </form>
          </div>
      </div></>
  );
};
export default StatusArticle;