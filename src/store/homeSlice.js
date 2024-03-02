
import { createSlice } from "@reduxjs/toolkit";//as it's made inside the export that's why curly braces are put

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genres: {},
    },
    reducers: {
        getApiConfiguration : (state, action)=>{//action is jo pass karenge use krte time
            state.url= action.payload;
        },
        getGenres : (state, action)=>{//action is jo pass karenge use krte time
            state.genres= action.payload;
        },
    }
}) ;

export const {getApiConfiguration, getGenres} = homeSlice.actions;
export default homeSlice.reducer;