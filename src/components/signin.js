import React, {useState} from 'react';
import axios from 'axios';
import "./css/regispage.css";

function SignIn({setToken}) {
    const[inputs, setInputs] = useState({email:"", password:""});
    const[status, setStatus] = useState("");

    const changeHandler = (e)=>{
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        // console.log(inputs);
        //we post the login info to the api
        let postData = inputs;
        let result = await axios.post("http://localhost:5000/api/user/login", postData);
        setStatus(result.data.status);
        if(result.data.accessToken && result.data.refreshToken){
            setToken({token: result.data.accessToken, refreshToken: result.data.refreshToken});
        }
    }
    return (
        <div className="regis_container">
           <h1 className="page_heading">Sign-In</h1>
           {status}
           <form className="regis_fields" onSubmit={submitHandler}>
            <input className="input_text" type="text" placeholder="Email" value={inputs.email} name="email" onChange={changeHandler}/>
            <input className="input_text" type="password" placeholder="Password" value={inputs.password} name="password" onChange={changeHandler}/>
            <input className="input_button" type="submit" name="login" value="Sign in"/>
           </form>
        </div>
    )
}

export default SignIn;
