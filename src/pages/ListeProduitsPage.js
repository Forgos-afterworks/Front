import React, {useEffect, useState} from "react";
import produitsAPI from "../services/ProduitsAPI";
import {Button, Card, Dropdown, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import imageProduitDefault from "../images/imageProduitDefault.jpg";
import categorieAPI from "../services/CategorieAPI";

const ListeProduitsPage = () => {

    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [titleCateg, setTitleCateg] = useState("Tous");

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    const CustomMenu = React.forwardRef(
        ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

    const fetchCategories = async () => {
        try {
            const data = await categorieAPI.getCategoriesWithProduct();
            setCategories(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchProduits = async (categorie) => {
        try {
            let data;
            if (categorie && categorie !== "all") {
                data = await produitsAPI.getProductsByCategory(categorie["idCategorie"]);

                setTitleCateg(categorie["nom"]);
            }
            else {
                data = await produitsAPI.getProduits();
                setTitleCateg("Tous");
            }
            setProduits(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchProduits("all")
        fetchCategories()
    }, [])

    const _categories = categories.map((categorie) => (
        <Button onClick={() => fetchProduits(categorie)} className="dropdown-item">{categorie["nom"]}</Button>
    ))

    const _produits = produits.map((produit) => (
        <Link to={"/produits/" + produit["idProduit"]} className="cardInfos">
            <Card className="mt-3">
                <Card.Img variant="top" style={{maxHeight: "16em", objectFit: "cover"}} src={
                    produit["image"] || imageProduitDefault
                }/>
                <Card.Body>
                    <Card.Title>{produit["nom"]}</Card.Title>
                    <Card.Text>Catégorie : {produit["idCategorie"]["nom"]}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    ))

    return (
        <div className="container">
            <h1>Liste de nos produits</h1>
            <Dropdown className="m-1 ms-5">
                <Dropdown.Toggle as={CustomToggle}>
                    <Button variant="white" size="sm" className="categoriesNav"><h3>Catégorie : {titleCateg}</h3>
                    </Button>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    <Button onClick={() => fetchProduits("all")} className="dropdown-item"><strong>Tous</strong></Button>
                        {_categories}
                </Dropdown.Menu>
            </Dropdown>

            <div className="d-flex justify-content-evenly flex-wrap">
                {_produits}
            </div>

        </div>
    )
}

export default ListeProduitsPage;