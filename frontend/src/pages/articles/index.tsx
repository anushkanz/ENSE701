import { GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie';

  const DataFetcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const actionButton = (item: never)=>{
        console.log(item);
    }
    const fetchData = async () => {
      if(Cookies.get('token')){
        console.log(Cookies.get('token'));
          try {
            const response = await fetch('http://localhost:8082/api/articles',{
              method: 'GET',
              headers:{
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + Cookies.get('token'),
                },
            }); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
      }
    };
  
   return (
    <div className="space-y-12">
        <div className="pb-12">
            {loading ? (
                <div className="absolute top-1/2 left-1/2 -mt-4 -ml-2 h-8 w-4 text-indigo-700">
                  <div className="absolute z-10 -ml-2 h-8 w-8 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 16 16">
      <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
    </svg>
                  </div>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
            
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">Articles</h2>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                      className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    >
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th
                              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                            Title
                            </th>
                            <th
                              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                              Authors
                            </th>
                            <th
                              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                              Source
                            </th>
                            <th
                              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((item) => (
                            <tr key={item._id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {item.title}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap">{item._id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{item.authors}</p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{item.source}</p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">


                              {item.status === '1' ? <span
                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                  >
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Active</span>
                                  </span> : <span
                                    className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                                  >
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Not Active</span>
                                  </span>}

                                  
                              </td>
                              <td
                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                              >
                                <button onClick={()=>actionButton(item)}
                                  type="button"
                                  className="inline-block text-gray-500 hover:text-gray-700"
                                >
                                  <svg
                                    className="inline-block h-6 w-6 fill-current"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
    </div>
  );
  };
  export default DataFetcher;