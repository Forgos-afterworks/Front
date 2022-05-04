import React, {useEffect, useState} from "react";
import articleApi from "../services/ArticleApi";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

const RubriquePage = () => {
    const [rubriques, setRubriques] = useState([]);
    const [articles, setArticles] = useState([]);

    const fetchRubriques = async () => {
        try {
            let data;
            data = await articleApi.getRubriques();
            setRubriques(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchArticles = async () => {
        try {
            let data;
            data = await articleApi.getArticles()
            setArticles(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchRubriques();
        fetchArticles();
    }, [])

    const _rubriques = rubriques.map((rubrique) => {
        const _articles = articles
            .filter(article => article["idRubrique"]["idRubrique"] === rubrique["idRubrique"])
            .map(article =>
                <Link to={"/admin/modifyArticle/" + article["idArticle"]} className="cardInfos">
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>{article["titre"]}</Card.Title>
                            <Card.Text>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
        )

        return (
            <Link to={"/admin/modify-rubric/" + rubrique["idRubrique"]} className="cardInfos">
                <Card className="mt-3">
                    <Card.Body className={"text-center"}>
                        <Card.Title>{rubrique["titre"]}</Card.Title>
                        <hr/>
                        <Card.Text>
                            {_articles}
                            <Link to={"/admin/createArticle"} className={"btn btn-outline-dark mt-3"}>
                                +
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        )
    })

    return(
        <div className={"container"}>
            <h1>Gestion de rubriques et d'articles</h1>
            <div className="d-flex justify-content-evenly flex-wrap">
                {_rubriques}
                <Link to={"/admin/create-rubric"} className={"btn btn-outline-dark mt-4"} style={{maxHeight: 40}}>
                    Créer une rubrique
                </Link>
            </div>
        </div>
    )
}

export default RubriquePage;