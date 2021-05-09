import axios from "axios";

const getToken = ()=>{
    const token = localStorage.getItem("accessToken");
    const reToken = localStorage.getItem("RefreshToken");//will implement later
     
    return token;
}

const getMovie = async(id)=>{
    try{
        let res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        return res.data;
    }catch(err){
        console.error(err);
        return false;
    }
}

const authHead = {
    headers: {"Authorization" : `Bearer ${getToken()}`}
    };

const addMovie = async (movieObj)=>{
    try{
        await axios.post("http://localhost:5000/api/movies",movieObj, authHead);
        return true;
    }catch{
        return false;
    }
}

const updateMovie = async (id, movieObj)=>{
    try{
        await axios.put(`http://localhost:5000/api/movies/${id}`,movieObj, authHead);
        return true;
    }catch{
        return false;
    }
}

const deleteMovie = async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/api/movies/${id}`, authHead);
        return true;
    }catch(err){
        return false;
    }
}

export {getMovie, addMovie, deleteMovie, updateMovie};