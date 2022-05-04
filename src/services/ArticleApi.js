import axios from "../config/axios";

const getRubriques = () => {
    return axios.get("/rubriques")
        .then(response => response.data);
}

const getRubriqueById = (idRubrique) => {
    return axios.get("/rubriques/" + idRubrique)
        .then(response => response.data);
}

const createRubrique = (titleRubric, descriptionRubric = "") => {
    return axios.post("/rubriques", {"titre": titleRubric, "description": descriptionRubric})
        .then(response => response.data)
}

const modifyRubrique = (titleRubric, descriptionRubric, idRubrique) => {
    return axios.put("/rubriques/" + idRubrique, {"titre": titleRubric, "description": descriptionRubric})
        .then(response => response.data)
}

const getArticles = () => {
    return axios.get("/articles")
        .then(response => response.data);
}

const getArticleById = (idArticle) => {
    return axios.get("/articles/" + idArticle)
        .then(response => response.data);
}

const createArticle = (title, content, rubrique) => {
    return axios.post("/articles", {
        "titre": title,
        "contenue": content,
        "idRubrique": rubrique
    })
        .then(response => response.data);
}

export default {getRubriques, createArticle, createRubrique, getArticles, getArticleById, getRubriqueById, modifyRubrique }