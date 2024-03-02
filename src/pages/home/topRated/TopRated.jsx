import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";


const TopRated = () => {

    const [endpoint , setEndpoint] = useState("movie");//means initially day is called from the api
    
    const {data , loading } = useFetch(`/${endpoint}/top_rated`);

    const onTabChange= (tab)=>{
        setEndpoint(tab=== "Movies" ? "movie" : "tv");//here the api's are being called that's why in small day and week
    };
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs data= {["Movies" , "TV Shows"]}/> onTabChange= {onTabChange}
        </ContentWrapper>
        <Carousel 
        data={data?.results} 
        loading= {loading}
        endpoint= {endpoint}
        />
    </div>// '?' denotes optional chaining we know
  );
};

export default TopRated