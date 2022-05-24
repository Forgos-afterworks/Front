import axios from "../config/axios";

const getAllCommentsByProduit = (idProduit) => {
    return axios.get("/comments/" + idProduit)
        .then(response => response.data);
}

const createComment = (email, idProdDecl, titre, description) => {
    return axios.post("/comments",
        {"idProduitDeclinaison":idProdDecl, "titre":titre, "description":description})
        .then(response => response.data);
}

export default {getAllCommentsByProduit, createComment};