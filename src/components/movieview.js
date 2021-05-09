import React,{useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {deleteMovie as deleteMovies} from "./httpinteraction/apiconnect.js";
import { useParams } from 'react-router';
import {BackButton} from "./subcomponents/buttons"
import {updateMovie, get} from "./httpinteraction/apiconnect.js";
import "./css/movieview.css";
import "./css/popup.css";

function MovieView({token}) {
    const {id} = useParams();
    const [movie, setMovie] = useState({cast:[]});
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();
    const getMovie = async()=>{
        try{
            let res = await axios.get(`http://localhost:5000/api/movies/${id}`);
            setMovie(res.data);
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(()=>{
        getMovie();
    }, [editMode])

    const deleteMovie = async(e)=>{
        if(await deleteMovies(id)){
            history.push("/");
        }
    }

    return (
        <>
        <div className="container">
            <BackButton/>
            <div className="movie">
                <div className="image_container">
                    <img src={movie.posterUrl} alt={movie.name}/>
                    {token.token&&(
                    <div className="edit_buttons">
                        <button className="update_btn" onClick={()=>{setEditMode(true)}}>Edit</button>
                        <button className="delete_btn" onClick={deleteMovie}>Delete</button>
                    </div>
                    )}
                </div>
                <div className="detail_container">
                    <h2 style={{textAlign:"center"}}>{movie.name}</h2>
                    <p>Cast: {movie.cast}</p>
                    <p>Year: {movie.year}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Language: {movie.language}</p>
                    <p>Runtime: {movie.runtime} Hours</p>
                     Description: <>{movie.description}</>
                </div>
            </div>
        </div>
        {editMode&&(
            <UpdateMode setEditMode={setEditMode} data={movie} id={id}/>
        )}
        </>
    )
}

function UpdateMode({setEditMode, data, id}){
  const [inputs, setInputs] = useState({...data, cast: data.cast.join(", ")});
  const changeHandler = (e)=>{
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }
  const submitHandler = async(e)=>{
        e.preventDefault();
        const castArr = inputs.cast.split(",");
        const savedData = {...inputs, cast:castArr};
        updateMovie(id, savedData);
        setEditMode(false);
  }
  return(
    <>
      <section className="add_movie_container newmovie_container">
          <form className="input_field" onSubmit={submitHandler}>
            <h1>Edit Movie</h1><BackButton setAddMode={setEditMode}/>
            <input value={inputs.name} type="text" className="input_text" placeholder="Movie name" name="name" onChange={changeHandler}/>
            <input value={inputs.genre} type="text" className="input_text" placeholder="Genre" name="genre" onChange={changeHandler}/>
            <input value={inputs.language} type="text" className="input_text" placeholder="Language" name="language" onChange={changeHandler}/>
            <input value={inputs.cast} type="text" className="input_text" placeholder="Cast eg (cast1 cast2...)" name="cast" onChange={changeHandler}/>
            <input value={inputs.runtime} type="text" className="input_text" placeholder ="Runtime eg (2.5hr)" name="runtime" onChange={changeHandler}/>
            <input value={inputs.year} type="text" className="input_text" placeholder="Year of release" name="year" onChange={changeHandler}/>
            <input value={inputs.description} type="text" className="input_text" placeholder="description" name="description" onChange={changeHandler}/>
            <input value={inputs.posterUrl} type="text" className="input_text" placeholder="poster URL"name="posterUrl" onChange={changeHandler}/>
            <input type="submit" className="input_button" value="Edit Movie"/>
          </form>
      </section>
    </>
  )
}

export default MovieView;
