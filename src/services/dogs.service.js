import axios from "axios";
import URI from "../services/uri";

const getAllDogsList = (payload) => {
    const { order, limit, page } = payload;
    const url = `${process.env.REACT_APP_API_URL}/${URI.GET_ALL_IMAGES}?order=${order}&limit=${limit}&page=${page}`;
    return axios.get(url);
};

const getDogInfo = (id) => {
    const url = `${process.env.REACT_APP_API_URL}/${URI.GET_IMAGE.replace("{image_id}", id)}`;
    return axios.get(url);

}

const getAllDogBreeds = (payload) => {
    const { page, limit } = payload;
    const url = `${process.env.REACT_APP_API_URL}/${URI.GET_BREEDS}?&page=${page}&limit=${limit}`;
    return axios.get(url);
}

const getFilteredDogBreeds = (ids) => {
    const url = `${process.env.REACT_APP_API_URL}/${URI.GET_ALL_IMAGES}?breed_ids=${ids}`;
    return axios.get(url);
}

export { getAllDogsList, getDogInfo, getAllDogBreeds, getFilteredDogBreeds };