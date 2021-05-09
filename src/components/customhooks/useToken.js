import {useState} from "react";

function useToken(){
    const getToken = ()=>{
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        return {token, refreshToken};
    }
    const[token, setToken] = useState(getToken());

    const saveToken = (tokenObj)=>{
        const {token, refreshToken} = tokenObj;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(tokenObj);
    }

    return{
        setToken : saveToken,
        token : token,
    };
}

export default useToken;
