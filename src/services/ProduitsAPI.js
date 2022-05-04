import axios from "../config/axios";

const getProduits = () => {
    return axios.get("/produits")
        .then(response => response.data);
}

const getProduitById = (id) => {
    return axios.get("/produits/" + id)
        .then(response => response.data);
}

const getProductsByCategory = (id) => {
    return axios.get("/produits/categorie/" + id)
        .then(response => response.data);
}


export default {getProduits, getProduitById, getProductsByCategory};