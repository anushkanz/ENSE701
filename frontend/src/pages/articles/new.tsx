import { FormEvent, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { BrowserRouter, Route } from "react-router-dom";
import { useRouter } from "next/router";

const NewDiscussion = () => {
   
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [source, setSource] = useState("");
    const [publication_year, setPubYear] = useState("");
    const [doi, setDoi] = useState("");
    const [summary, setSummary] = useState("");
    const [linked_discussion, setLinkedDiscussion] = useState("");
    const [status, setStatus] = useState("");

    //Submit 
    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            let response = await fetch('http://localhost:8082/api/articles', {
                method: "POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    title,
                    authors,
                    source,
                    publication_year,
                    doi,
                    summary,
                    linked_discussion,
                    status
                }),
            })

            response = await response.json()
            console.log(JSON.stringify(response));
        
        console.log(
            JSON.stringify({
                title,
                authors,
                source,
                publication_year,
                doi,
                summary,
                linked_discussion,
            })
        );
    };
    
// Some helper methods for the authors array
// const addAuthor = () => {
//     setAuthors(authors.concat([""]));
// };
// const removeAuthor = (index: number) => {
//     setAuthors(authors.filter((_, i) => i !== index));
// };
//const changeAuthor = (index: number, value: string) => {
// setAuthors(
//     authors.map((oldValue, i) => {
//         return index === i ? value : oldValue;
//     })
// );
//};
    // Return the full form
    return (
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <div className="pb-12">
            <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">New Article</h3>
                <a href="/articles" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Articles</a>
                <a href="/logout" className="rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-red-800 duration-300">Logout</a>
            </div> 
            <form onSubmit={submitNewArticle}>
                <div className="mb-5 hidden">
                    <label htmlFor="title">Status:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded"
                        type="text"
                        name="status"
                        id="status"
                        value="0"
                        onChange={(event) => {
                            setStatus(event.target.value);
                        }}
                    />
                </div>   
                <div className="mb-5"> 
                    <label htmlFor="title">Title:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(event) => {
                        setTitle(event.target.value);
                        }}
                    />
                </div>    
                <div className="mb-5">
                    <label htmlFor="author">Authors:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        type="text"
                        name="authors"
                        id="authors"
                        value={authors}
                        onChange={(event) => {
                        setAuthors(event.target.value);
                    }}
                    />
                </div>    
                <div className="mb-5">    
                    <label htmlFor="source">Source:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        type="text"
                        name="source"
                        id="source"
                        value={source}
                        onChange={(event) => {
                        setSource(event.target.value);
                    }}
                    />
                </div>    
                <div className="mb-5">    
                    <label htmlFor="pubYear">Publication Year:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        type="number"
                        name="pubYear"
                        id="pubYear"
                        value={publication_year}
                        onChange={(event) => {
                            setPubYear(event.target.value);
                        }}
                    />
                </div>    
                <div className="mb-5">   
                    <label htmlFor="doi">DOI:</label>
                    <input
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        type="text"
                        name="doi"
                        id="doi"
                        value={doi}
                        onChange={(event) => {
                            setDoi(event.target.value);
                        }}
                    />
                </div>    
                <div className="mb-5">  
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                    name="summary"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    />
                </div>    
                <div className="mb-5">
                    <label htmlFor="linked_discussion">Linked discussion:</label>
                    <textarea
                        className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        name="linked_discussion"
                        value={linked_discussion}
                        onChange={(event) => setLinkedDiscussion(event.target.value)}
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
export default NewDiscussion;