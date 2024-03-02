import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";// hook to change the day from 16-8-23 to Aug 16,2023 

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


import "./style.scss";


const Carousel = ({data , loading, endpoint, title}) => {
    const carouselContainer = useRef();//to change it to div again in the network console
    const {url} = useSelector((state)=> state.home); 
    const navigate = useNavigate();

    const navigation = (dir)=>{//dir denotes direction
        const container = carouselContainer.current;//data of movies we take from the api

        const scrollAmount= 
        dir === 'left' //? -container?.offsetWidth : +container?.offsetWidth; //scroll amount depends on which direction you want to go
        ? container.scrollLeft - (container.offSetWidth + 20)
        : container.scrollLeft + (container.offSetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behaviour : "smooth",
        });
    };

    const skItem= ()=>{
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

  return (
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={()=> navigation("left")}
            />

<BsFillArrowRightCircleFill
            className="carouselRighttNav arrow"
            onClick={()=> navigation("right")}
            />

            {!loading ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item)=>{//as the data is from the server therefore optional chaining is used
                    const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;

                        return(
                        <div key={item.id}
                        className="carouselItem" onClick={()=>navigate(
                            `/${item.media_type || endpoint}/${item.id}`
                        )
                        }
                        >
                            <div className="posterBlock">
                                <Img src={posterUrl}/>
                                <CircleRating 
                                rating= {item.vote_average.toFixed(1)}//means the rating after '.' point i.e. 7.4/10
                                />
                                <Genres data={item.genre_ids.slice(0,2)}/>
                            </div>

                            <div className="textBlock">
                                <span className="title">
                                    {item.title || item.name}
                                </span>

                                <span className="date">
                                    {dayjs(item.release_Date).format(//library to change the day i.e. dayjs
                                        'MMM D, YYYY'
                                    )}
                                </span>
                            </div>

                        </div>
                        );
                    })}
                </div>
            ) : (
                <span>Loading....</span>


            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel