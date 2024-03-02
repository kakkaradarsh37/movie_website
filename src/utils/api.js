import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization : "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async(url, params)=> {
    try {
        const {data} = await axios.get(BASE_URL + url, {//it takes url, headers and params as the headers key and value is same therefore it is written as this and we destructure the data here and return
        headers,
        params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};