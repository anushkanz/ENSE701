import { GetStaticProps, NextPage } from "next";

import SortableTable from "@/components/table/SortableTable";

import React, { useEffect, useState } from 'react';


  const DataSingleFetcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/articles/'); // Replace with your API endpoint
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
                    </tr>
                </thead>
                <tbody> 
                    
                </tbody>
            </table>
            )}
        </div>
    </div>
  );
  };
  
  export default DataSingleFetcher;