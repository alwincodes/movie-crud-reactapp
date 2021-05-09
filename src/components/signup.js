import React, {useState} from 'react';
import axios from "axios";
import "./css/regispage.css";

function SignUp() {
 const[inputs, setInputs] = useState({username:"", email:"", password:"", repassword:""});
  const[status, setStatus] = useState("");

 const changeHandler = (e)=>{
     e.persist();
     setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
 }

 const submitHandler = async(e)=>{
    e.preventDefault();
    let result = await axios.post("http://localhost:5000/api/user/signup", inputs)
    setStatus(result.data.status);
 }
 return (
        <div className="regis_container">
           <h1 className="page_heading">Sign-Up</h1>
           {status}
           <form className="regis_fields" onSubmit={submitHandler}>
            <input className="input_text" type="text" placeholder="Username" value={inputs.username} name="username" onChange={changeHandler}/>
            <input className="input_text" type="text" placeholder="Email" value={inputs.email} name="email" onChange={changeHandler}/>
            <input className="input_text" type="password" placeholder="Password" value={inputs.password} name="password" onChange={changeHandler}/>
            <input className="input_text" type="password" placeholder="Re-enter Password" value={inputs.repassword} name="repassword" onChange={changeHandler}/>
            <input className="input_button" type="submit" name="login" value="Sign in"/>
           </form>
        </div>
    )
}

export default SignUp;
