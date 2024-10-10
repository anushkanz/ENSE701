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
                <p>Loading...</p>
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
                                <button
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