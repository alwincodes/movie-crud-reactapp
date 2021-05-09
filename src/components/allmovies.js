import React ,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AddButton, BackButton} from "./subcomponents/buttons.js";
import {addMovie} from "./httpinteraction/apiconnect";
import "./css/allmovies.css";
import "./css/svg.css";
import "./css/popup.css";


function AllMovies({token}) {
  const [movies, setMovies] = useState([]);
  const [addMode, setAddMode] = useState(false);


  
  const fetchMovies = async()=>{
    try {   
    const response = await axios.get("http://localhost:5000/api/movies/");
      setMovies(response.data);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchMovies();
  }, [addMode]);

  return (
     <>
        <section className="movies-list">
            <h1 style={{fontWeight:"bold"}}>Movies</h1>
            {token.token&&(<AddButton setAddMode={setAddMode}/>)}
            <div className="movie_container">
                {/* Here we iterate over the movie objects by using array mapper */}
                {movies.map((movie)=>{
                    const {_id, name, posterUrl, genre, year} = movie;
                    return(
                      <div className="movie-card" key={_id}>
                        <img src={posterUrl} alt="Movie Poster"/>
                        <div className="title">
                            {name}
                        </div>
                        <div className="movie_details">
                            <p id="year">({year})</p>
                            <p id="genre">{genre}</p>
                        </div>
                        <Link to={`/view/${_id}`}>
                          <button className="view_button">
                              View More
                          </button>
                        </Link>
                      </div>
                    );
                })}
            </div>
        </section>
        {addMode&&(
          <AddMode setAddMode={setAddMode}/>
        )}
     </>
  );
}

function AddMode({setAddMode}){
  const [inputs, setInputs] = useState({name:"", genre:"", language:"", cast:"", runtime:"", year:"", description:"", posterUrl:""});
  const changeHandler = (e)=>{
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }
  const submitHandler = async(e)=>{
        e.preventDefault();
        console.log(inputs);
        const castArr = inputs.cast.split(",");
        const savedData = {...inputs, cast:castArr};
        addMovie(savedData);
        setAddMode(false);
  }
  return(
    <>
      <section className="add_movie_container newmovie_container">
          <form className="input_field" onSubmit={submitHandler}>
            <h1>Add Movie</h1><BackButton setAddMode={setAddMode}/>
            <input value={inputs.name} type="text" className="input_text" placeholder="Movie name" name="name" onChange={changeHandler}/>
            <input value={inputs.genre} type="text" className="input_text" placeholder="Genre" name="genre" onChange={changeHandler}/>
            <input value={inputs.language} type="text" className="input_text" placeholder="Language" name="language" onChange={changeHandler}/>
            <input value={inputs.cast} type="text" className="input_text" placeholder="Cast eg (cast1 cast2...)" name="cast" onChange={changeHandler}/>
            <input value={inputs.runtime} type="text" className="input_text" placeholder ="Runtime eg (2.5hr)" name="runtime" onChange={changeHandler}/>
            <input value={inputs.year} type="text" className="input_text" placeholder="Year of release" name="year" onChange={changeHandler}/>
            <input value={inputs.description} type="text" className="input_text" placeholder="description" name="description" onChange={changeHandler}/>
            <input value={inputs.posterUrl} type="text" className="input_text" placeholder="poster URL"name="posterUrl" onChange={changeHandler}/>
            <input type="submit" className="input_button" value="Add Movie"/>
          </form>
      </section>
    </>
  )
}

export default AllMovies;