import React, {useContext, useEffect, useState} from "react";
import produitsAPI from "../services/ProduitsAPI";
import imageProduitDefault from "../images/imageProduitDefault.jpg";
import {Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AuthApi from "../services/AuthApi";
import declinaisonAPI from "../services/DeclinaisonAPI";
import commentAPI from "../services/CommentAPI";
import jwtDecode from "jwt-decode";

const DetailProduitPage = ({
                               match: {
                                   params: {idProduit}
                               }, history
                           }) => {

    const [produit, setProduit] = useState([]);
    const [titleComment, setTitleComment] = useState([""]);
    const [descComment, setDescComment] = useState([""]);
    const [produitDeclinaisons, setProduitDeclinaisons] = useState([]);
    const [produitDeclinaison, setProduitDeclinaison] = useState([]);
    const context = useContext(AuthContext);
    let payload = ""
    if (context.isAuth) payload = jwtDecode(localStorage.getItem("token"));

    const addComment = async e => {
        try {
            e.preventDefault();
            //await commentAPI.createComment(produitDeclinaison, titleComment, descComment)
        }catch (e) {
            console.log(e)
        }
    }

    const fetchProduit = async () => {
        try {
            const data = await produitsAPI.getProduitById(idProduit);
            setProduit(data);
        } catch (e) {
            console.log(e);
        }
    }
    const fetchDeclinaisons = async () => {
        try {
            const data = await declinaisonAPI.getAllProduitDeclinaisonsByProduit(idProduit);
            setProduitDeclinaisons(data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchProduit()
        fetchDeclinaisons()
    }, [])

    const _declinaisons = produitDeclinaisons.map((prodDecl) => (
        <option key={prodDecl["idDeclinaison"]["idDeclinaison"]} value={prodDecl["idDeclinaison"]["idDeclinaison"]}>{prodDecl["idDeclinaison"]["nom"]}</option>
    ))

    return (
        <>
            <h1 className="m-3">Détail de notre produit : {produit["nom"]}</h1>

            <div className="row">
                <div className="col">
                    <Image variant="top" style={{maxHeight: "20em", objectFit: "cover"}} src={
                        produit["image"] || imageProduitDefault
                    }/>
                </div>
                <div className="col">
                    <p><h4 style={{fontWeight: "bold"}}>Description :</h4>{produit["description"]}</p>
                    <p><h4 style={{fontWeight: "bold"}}>Prix unitaire :</h4>{produit["prixUnitaire"]}€</p>
                    <p><h4 style={{fontWeight: "bold"}}>Stock :</h4>{produit["nombreEnStock"]} unitées</p>
                    {context.isAuth && (
                        <Link to="#" className={"btn btn-primary"}>Ajouter au panier</Link>
                    )}
                </div>
            </div>

            {context.isAuth && (
                <form onSubmit={addComment} style={{marginTop: 15}}>
                    <div>
                        <label htmlFor="username"
                               className="form-label">Titre de votre commentaire </label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               value={titleComment}
                               onChange={e => setTitleComment(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"
                               className="form-label">Contenue de votre commentaire </label>
                        <input type="text"
                               className="form-control"
                               id="password"
                               value={descComment}
                               onChange={e => setDescComment(e.target.value)}/>
                    </div>
                    <div>
                        <select value={"1"} name={"rubrique"} id={"rubrique"} onChange={(e) =>setProduitDeclinaison(e.target.value)}>
                            {_declinaisons}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter uncommentaire</button>
                </form>
            )}
        </>
    )
}

export default DetailProduitPage;