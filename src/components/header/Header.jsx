import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");//with these hooks and states we will manage the top header component with the logo when scroll down will disappear and when again scroll up then the gradient will change to dark from light  
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();//useNavigate() hook ke through humne ek instance create krlia ab hum ousse use krke hum navigate krwayenge
    const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0,0);
    }, [location])//here when we will change the page to next page the scroll will start from top position itself

    const controlNavbar =()=>{
      if(window.scrollY> 200){
      if(window.scrollY > lastScrollY && !mobileMenu){// >200 and if greater than lastScrollY then
      setShow("hide");//these are the css properties which are defined there
    } else{
      setShow("show");
    }
  } else{
    setShow("top");
  }
  setLastScrollY(window.scrollY);
};
    useEffect(()=>{
      window.addEventListener("scroll", controlNavbar);
      return()=>{
        window.removeEventListener('scroll',controlNavbar);//here when we add event listener in react we have to remove as well to prevent memory leakage
      };
    }, [lastScrollY]);

    const searchQueryHandler = (event)=>{
      if(event.key ==="Enter" && query.length> 0){
        navigate(`/search/${query}`);
        setTimeout(()=>{
          setShowSearch(false);
        } , 1000);
      }
    }

    const openSearch= () =>{
setMobileMenu(false);
setShowSearch(true);
    };

    const openMobileMenu = ()=>{
      setMobileMenu(true);
      setShowSearch(false);
    };

    const navigationHandler = (type) => {
    if(type === "movie"){
      navigate("/explore/movie");
    } else{
      navigate("/explore/tv");
    }
    setMobileMenu(false);//means the menu in mobile of movie and tv header will automatically be closed
    };

    return(
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={()=> navigate("/")}>
            <img src={logo} alt=""/>

          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=> navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={()=> navigationHandler("tv")}> TV Shows</li>
            <li className="menuItem">
 <HiOutlineSearch onClick={openSearch}/>

   </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {mobileMenu ? (
              <VscChromeClose onClick={()=>
              setMobileMenu(false)}/>
            ) : ( 
              <SlMenu onClick={openMobileMenu}/>
            )}
          </div>
        </ContentWrapper>
        {showSearch && (
        <div className="searchBar">
<ContentWrapper>
  <div className="searchInput">
    <input
    type="text"
    placeholder="Search for a movie or tv show...."
    onChange= {(e)=> setQuery(e.target.value)}
    onKeyUp={searchQueryHandler}

/>
<VscChromeClose onClick={()=>
setShowSearch(false)}/>
  </div>
</ContentWrapper>

        </div>
        )}
      </header>
    );
    
};


export default Header