import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PanelAdminPage = () => {
    const context = useContext(AuthContext);

    return(
        <div className={"container"}>
            <h1>Panel Administrateur</h1>
            <Link to={"/admin/createArticle"} className={"mt-3"}>Rédiger un article</Link>
            <br/>
            <Link to={"/admin/rubrique"} className={"mt-3"}>Gérer les rubriques</Link>
            {
                context.power >= 2 && (
                    <>
                        <br/>
                        <Link to={"/admin/gestion-employe"} className={"mt-3"}>Gérer les rédacteurs</Link>
                    </>
                )
            }
        </div>
    )
}

export default PanelAdminPage;