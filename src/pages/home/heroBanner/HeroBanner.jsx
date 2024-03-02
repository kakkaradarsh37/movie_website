import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss"

import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  //initially state is empty
  const [background, setBackground] = useState("");//the data which came in the upcoming we want any random background picture to be pushed in the background image 
  const [query, setQuery] = useState("");
  const navigate= useNavigate();//so we have create here an instance of navigate aur hame useFetch() ko yaha call krwana hai
  const {url} = useSelector((state)=> state.home);
  
  //now we will call the api from the endpoint

  const {data, loading} = useFetch("/movie/upcoming")//initially data is empty

  useEffect(()=>{
    const bg= 
    data?.results?.[Math.floor(Math.random()*//optional chaining of javascript is used here so that if the value of data is empty then it will nor=t be o=processed further
      20)]?.backdrop_path;//.floor is used because if the data multiplied is in floating point the it will not encounter the background image
      setBackground(bg);
  }, [data]);

const searchQueryHandler = (event)=>{
  if(event.key === "Enter" && query.length> 0){
navigate(`/search/${query}`);
  }
};

  return (
   <div className="heroBanner">
    {!loading && (
    <div className="backdrop-img">
      <Img src={background}/>
    </div>
)}
<div className="opacity-layer"></div>
<ContentWrapper>
    
    <div className="heroBannerContent">
    <span className='subTitle'>
      Millions of movies, TV shows and people to discover.
      Explore Now.
    </span>
    <div className="searchInput">
      <input type="text" 
      placeholder='Search for a movie or tv show....'
      onChange={(e) => setQuery(e.target.value)}
      onKeyUp={searchQueryHandler}/>
      <button>Search</button>
    </div>
    </div>
   </ContentWrapper>
   </div>
  );
};

export default HeroBanner