import {  useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'//within brackets because it's made in another folder as variable
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";

import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";




function App() {
  const dispatch = useDispatch();
  //useSelector is used to use the value
  const {url}= useSelector((state)=> state.home);
  console.log(url);

//   useEffect(()=>{//useEffect hook to call the api
// apiTesting();
//   }, []);

  // const apiTesting = ()=>{
  //   fetchDataFromApi("/movie/popular").then((res)=>{
  //     console.log(res);
  //     dispatch(getApiConfiguration(res));
  //   });
  // };

  useEffect(()=>{
fetchApiConfig();
genresCall();

  }, []);
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration").then((res)=>{
      console.log(res);

      const url={
        backdrop: res.images.secure_base_url + "original", //here the size is being set original we can even change it
        poster: res.images.secure_base_url + "original",//here fr image three things are required poster , profile picture of movie and backdrop i.e. background
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
    };


    const genresCall = async()=>{
    let promises= [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id]=
        item)) ;
    });
    dispatch(getGenres(allGenres));//key and here value is passed 
    // console.log(allGenres);
    };
  return(
  //  <div className='App'>
  //   App
  //   {url?.total_pages}
  //   </div>
  <BrowserRouter>
 <Header/>
 <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/:mediaType/:id" element={<Details/>}/>
  <Route path="/search/:query" element={<SearchResult/>}/>
  <Route path="/explore/:mediaType" element={<Explore/>}/>
  <Route path= "*" element={<PageNotFound/>}/>

  </Routes>
  <Footer/>
 
  </BrowserRouter>
  );
     
    
  
}

export default App;
