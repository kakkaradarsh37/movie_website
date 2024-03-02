import React from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'

import "./style.scss"

const Genres = ({data}) => {//destructured the data here 
    const {genres} =useSelector((state)=> state.home);
  return (
    <div className="genres">
        {data?.map((g)=>{
            if(!genres[g]?.name) return; //means if the data is not in the store then return
            return(
                <div key={g} className='genre'>
                    {genres[g]?.name}

                </div>
            );
        })}
    </div>
  );
};

export default Genres