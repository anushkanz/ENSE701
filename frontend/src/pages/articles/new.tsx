import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
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
    <div className="space-y-12">
        <div className="pb-12">
        <h1>New Article</h1>
        <form className={formStyles.form} onSubmit={submitNewArticle}>
        <input
            className={formStyles.formItem}
            type="text"
            name="status"
            id="status"
            value={1}
            onChange={(event) => {
            setStatus(event.target.value);
        }}
        />
        <label htmlFor="title">Title:</label>
        <input
            className={formStyles.formItem}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => {
            setTitle(event.target.value);
            }}
        />
    <label htmlFor="author">Authors:</label>
    <input
        className={formStyles.formItem}
        type="text"
        name="authors"
        id="authors"
        value={authors}
        onChange={(event) => {
        setAuthors(event.target.value);
    }}
    />
    <label htmlFor="source">Source:</label>
    <input
        className={formStyles.formItem}
        type="text"
        name="source"
        id="source"
        value={source}
        onChange={(event) => {
        setSource(event.target.value);
    }}
    />
    <label htmlFor="pubYear">Publication Year:</label>
    <input
        className={formStyles.formItem}
        type="number"
        name="pubYear"
        id="pubYear"
        value={publication_year}
        onChange={(event) => {
            setPubYear(event.target.value);
        }}
    />
    <label htmlFor="doi">DOI:</label>
    <input
        className={formStyles.formItem}
        type="text"
        name="doi"
        id="doi"
        value={doi}
        onChange={(event) => {
            setDoi(event.target.value);
        }}
    />
    <label htmlFor="summary">Summary:</label>
    <textarea
    className={formStyles.formTextArea}
    name="summary"
    value={summary}
    onChange={(event) => setSummary(event.target.value)}
    />

    <label htmlFor="linked_discussion">Linked discussion:</label>
    <textarea
    className={formStyles.formTextArea}
    name="linked_discussion"
    value={linked_discussion}
    onChange={(event) => setLinkedDiscussion(event.target.value)}
    />
        <button className={formStyles.formItem} type="submit">Submit</button>
    </form>
    </div>
    </div>
);
};
export default NewDiscussion;