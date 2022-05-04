import React, {useContext, useState} from "react";
import AuthApi from "../services/AuthApi";
import AuthContext from "../context/AuthContext";

const LoginPage = ({history}) => {

    // State pour le username et le mot de passe
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const context = useContext(AuthContext);

    // Soumission du formulaire
    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const token = await AuthApi.login(username,password);
            localStorage.setItem("token", token);
            context.setAuth(true);
            history.replace("/");
        }catch (e) {
            alert("Indentifiants invalides")
            console.log(e)
        }
    }

    return(
        <div className="container">
            <h1>Veuillez vous connecter</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"
                           className="form-label">Username </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Saisir votre mail"
                           id="username"
                           value={username}
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"
                           className="form-label">Mot de passe </label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </div>
    )
}

export default LoginPage;