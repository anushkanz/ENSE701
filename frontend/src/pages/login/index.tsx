import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import Cookies from 'js-cookie';
const userLogin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

//console.log(Cookies.get('token'));
//Submit 
const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    console.log(formData.toString());

    let response = await fetch('http://localhost:8082/api/users/login', {
        method: "POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formData.toString(),
    })
    console.log(await response);
    response = await response.json();
    const getJwt = JSON.stringify(response);
    const jsonArray = JSON.parse(getJwt);
    console.log(jsonArray.jwt);
    Cookies.set('token', jsonArray.jwt, { expires: 72, secure: true });
};
return (
    <div className="space-y-12">
        <div className="pb-12">
            <h1>Login</h1>
            <form className={formStyles.form} onSubmit={submitLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    className={formStyles.formItem}
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => {
                    setEmail(event.target.value);
                }}
                />
                <label htmlFor="password">Passwrod:</label>
                <input
                    className={formStyles.formItem}
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => {
                    setPassword(event.target.value);
                    }}
                />
                <button className={formStyles.formItem} type="submit">Submit</button>
            </form>
        </div>
    </div>
);
};
export default userLogin;