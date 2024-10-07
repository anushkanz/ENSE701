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
            
            <table  className="min-w-full table-fixed">
                <thead>
                    <tr>
                      <th>Title</th>
                      <th>Authors</th>
                      <th>Source</th>
                      <th>Publication year</th>
                      <th>Doi</th>
                      <th>Summary</th>
                      <th>Linked discussion</th>
                      <th>Status</th>
                      <th>Open</th>
                    </tr>
                </thead>
                <tbody> 
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td key={item._id}>{item.title}</td>
                            <td key={item._id}>{item.authors}</td>
                            <td key={item._id}>{item.source}</td>
                            <td key={item._id}>{item.publication_year}</td>
                            <td key={item._id}>{item.doi}</td>
                            <td key={item._id}>{item.summary}</td>
                            <td key={item._id}>{item.linked_discussion}</td>
                            <td key={item._id}>{item.status === '1' ? <p>Active</p> : <p>Not Active</p>}</td>
                            <td key={item._id}>Open</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    </div>
  );
  };
  // <Link to={`/articles/`}>Go to My Page</Link>
  export default DataFetcher;