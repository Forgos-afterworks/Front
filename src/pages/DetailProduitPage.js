import {useEffect, useState} from "react";
import produitsAPI from "../services/ProduitsAPI";

const DetailProduitPage = ({
                               match: {
                                   params: {idProduit}
                               }
                           }) => {

    const [produit, setProduit] = useState([]);

    const fetchProduit = async () => {
        try {
            const data = await produitsAPI.getProduitById(idProduit);
            setProduit(data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchProduit()
    }, [])

    return (
        <>
            <h1 className="m-3">Détail de notre produit : {produit["nomProduit"]}</h1>
            Je vais afficher l'image de la photo en bas Bien au milieux et si je clique dessus ça me l'ouvre dans un nouveau onglet
        </>
    )
}

export default DetailProduitPage;