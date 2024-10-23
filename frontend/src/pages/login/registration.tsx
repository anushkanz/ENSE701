import { FormEvent, useState } from "react";

const defaultSelectValue = "1"
const userRegistration = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    const [selected, setSelected] = useState(defaultSelectValue)
    const [loading, setLoading] = useState(false);

    //Submit 
    const submitRegistration = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(selected)
        console.log(type)
        const formData = new URLSearchParams();
       
        formData.append('email', email);
        formData.append('password', password);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('type', type);
        

        let response = await fetch('http://localhost:8082/api/users/', {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formData.toString(),
        })
        
        response = await response.json();
        console.log(response?.action);
        if(response?.action == 'redirct'){
            setLoading(true);
        }
        console.log(JSON.stringify(response));
    };
    return (
        <div className="space-y-12">
            <div className="pb-12">
            { loading? (
                <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
                    <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">Software Practice Empirical Evidence Database (SPEED)</p>
                            <p className="flex flex-col items-center justify-center mt-10 text-center"></p>
                        </div>
                        <div className="p-5 bg-white md:flex-1">
                            <h3 className="my-4 text-2xl font-semibold text-gray-700">Dashboard</h3>
                            <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                                <a href="/login" className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-800 duration-300">Login</a>
                                
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
                        <span>You have an account?</span>
                        <a href="/login" className="underline">Login</a>
                    </p>
                    <p className="mt-6 text-sm text-center text-gray-300">
                        Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                    </p>
                    </div>
                    <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Create Account</h3>
                    <form onSubmit={submitRegistration} className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label  className="text-sm font-semibold text-gray-500">First Name</label>
                            <input
                                required
                                type="fname"
                                name="fname"
                                id="fname"
                                autoComplete="off"
                                value={fname}
                                onChange={(event) => {
                                    setFname(event.target.value);
                                }}
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label  className="text-sm font-semibold text-gray-500">Last Name</label>
                            <input
                                required
                                type="lname"
                                name="lname"
                                id="lname"
                                autoComplete="off"
                                value={lname}
                                onChange={(event) => {
                                    setLname(event.target.value);
                                }}
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label  className="text-sm font-semibold text-gray-500">Email address</label>
                            <input
                                required
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
                                required
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

                        <div className="flex flex-col space-y-1">
                            <label  className="text-sm font-semibold text-gray-500">Account Type</label>
                            <select className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200" 
                            name="type" 
                            id="type"
                            defaultValue={selected}
                            onChange={(event) => {
                                setType(event.target.value);
                            }}
                            >
                                <option key="1" value="1">Submitter</option>
                                <option key="2" value="2">Moderator</option>
                                <option key="3" value="3">Analyst</option>
                            </select>
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
                            Sign up                        
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
    export default userRegistration;