import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import Cookies from 'js-cookie';

const userLogin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [settoken, setToken] = useState("");
const [redirect, setRedirect] = useState("");
//console.log(Cookies.get('token'));
//Submit 
const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    let response = await fetch('http://localhost:8082/api/users/login', {
        method: "POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formData.toString(),
    })
    
    response = await response.json();
    const getJwt = JSON.stringify(response);
    const jsonArray = JSON.parse(getJwt);
    
    Cookies.set('token', jsonArray.jwt, { expires: 72, secure: true });
    setToken(jsonArray.jwt);
    console.log(jsonArray.jwt)

    if(jsonArray?.jwt){
        Cookies.set('type', jsonArray.type, { expires: 72, secure: true });
        setRedirect(jsonArray?.type);
    }
};
return (
    <div className="space-y-12">
        <div className="pb-12">
    { settoken? (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                    <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">Software Practice Empirical Evidence Database (SPEED)</p>
                    <p className="flex flex-col items-center justify-center mt-10 text-center"></p>
                </div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Dashboard</h3>
                    <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                        <a href="/articles" className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-800 duration-300">Articles</a>
                        <a href="/articles/new" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">New Articles</a>
                        <a href="/logout" className="rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-red-800 duration-300">Logout</a>
                    </div>    
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                    <a href="#">SPEED</a>
                </div>
                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                Software Practice Empirical Evidence Database (SPEED)
                </p>
                <p className="flex flex-col items-center justify-center mt-10 text-center">
                    <span>Don't have an account?</span>
                    <a href="/login/registration" className="underline">Get Started!</a>
                </p>
                <p className="mt-6 text-sm text-center text-gray-300">
                    Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                </p>
                </div>
                <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                <form onSubmit={submitLogin} className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-1">
                        <label  className="text-sm font-semibold text-gray-500">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-500">Password</label>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    </div>
                    <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label className="text-sm font-semibold text-gray-500">Remember me</label>
                    </div>
                    <div>
                    <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                        Log in
                    </button>
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
)}
</div>
</div>
);

};
export default userLogin;