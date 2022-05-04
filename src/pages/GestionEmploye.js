import React, {useEffect, useState} from "react";
import EmployeAPI from "../services/EmployeAPI";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import employeImage from "../images/employeImage.png";
import plus from "../images/plus.jpg";

const GestionEmployePage = () => {

    const [employes, setEmployes] = useState([]);

    const fetchEmploye = async () => {
        try {
            let data;
            data = await EmployeAPI.getEmployees();
            setEmployes(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchEmploye()
    }, [])

    const _employe = employes.filter(employe => employe.idRole.idRole === 1).map(employe => (
        <Link to={"/admin/modify-employe/" + employe["idEmploye"]} className="cardInfos text-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={employeImage} />
                <Card.Body>
                    <Card.Title>{employe["prenom"]} { employe["nom"]}</Card.Title>
                    <Card.Text>
                        {employe.idRole.nom}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    ))

    return (
        <div className={"container"}>
            <h1 className={"mt-3"}>Page de gestion des employés</h1>
            <div className="d-flex justify-content-evenly flex-wrap mt-3">
                {_employe}
                <Link to={"/admin/create-redacteur"} className="cardInfos text-center my-auto">
                    <Card style={{ width: '8rem' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={plus} />
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

export default GestionEmployePage;