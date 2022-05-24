import axios from "../config/axios";

const getAllProduitDeclinaisonsByProduit = (idProduit) => {
    return axios.get("/produitsdeclinaisons/" + idProduit)
        .then(response => response.data);
}

export default {getAllProduitDeclinaisonsByProduit};