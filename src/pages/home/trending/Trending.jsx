import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";


const Trending = () => {

    const [endpoint , setEndpoint] = useState("day");//means initially day is called from the api
    
    const {data , loading} = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange= (tab)=>{
        setEndpoint(tab=== "Day" ? "day" : "week");//here the api's are being called that's why in small day and week
    };
  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data= {["Day" , "Week"]}/> onTabChange= {onTabChange}
        </ContentWrapper>
        <Carousel data={data?.results} loading= {loading}/>
    </div>// '?' denotes optional chaining we know
  );
};

export default Trending