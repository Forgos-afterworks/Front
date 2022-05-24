import AuthContext from "./context/AuthContext";
import './App.css';
import Header from "./components/Header";
import {withRouter, BrowserRouter, Switch, Route} from "react-router-dom";
import AccueilPage from "./pages/AccueilPage";
import ListeProduitsPage from "./pages/ListeProduitsPage";
import DetailProduitPage from "./pages/DetailProduitPage";
import LoginForm from "./pages/LoginPage";
import {useEffect, useState} from "react";
import AuthApi from "./services/AuthApi";
import {PrivateRouteToLevelPower} from "./components/PrivateRoute";
import CreateArticlePage from "./pages/CreateArticlePage";
import RubriquePage from "./pages/RubriquePage";
import PanelAdminPage from "./pages/PanelAdminPage";
import ModifyArticlePage from "./pages/ModifyArticlePage";
import GestionEmployePage from "./pages/GestionEmploye";
import ModifyRubricPage from "./pages/ModifyRubricPage";
import CreateRubriquePage from "./pages/CreateRubriquePage";
import ModifyEmployePage from "./pages/ModifyEmploye";
import CreateRedacteurPage from "./pages/CreateRedacteurPage";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
    const [powerRole, setPowerRole] = useState();

    useEffect(() => {
        if (isAuthenticated) {
            const payload = AuthApi.getPayload();
            setPowerRole(payload["rolePower"])
        } else {
            setPowerRole(0);
        }
    }, [isAuthenticated])

    const authContextValue = {
        isAuth: isAuthenticated,
        setAuth: setIsAuthenticated,

        power:powerRole,
        setPower: setPowerRole
    };

    const HeaderWithRouter = withRouter(Header);

    return (
        <AuthContext.Provider value={authContextValue}>
            <BrowserRouter>
                <HeaderWithRouter/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={AccueilPage}/>
                        <Route exact path="/produits" component={ListeProduitsPage}/>
                        <Route path="/produits/:idProduit" component={DetailProduitPage}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={DetailProduitPage}/>
                        <PrivateRouteToLevelPower path={"/admin/createArticle"} component={CreateArticlePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/modifyArticle/:idArticle"} component={ModifyArticlePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/rubrique"} component={RubriquePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/modify-rubric/:idRubric"} component={ModifyRubricPage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/gestion-employe"} component={GestionEmployePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/create-rubric"} component={CreateRubriquePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/modify-employe/:idEmploye"} component={ModifyEmployePage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin/create-redacteur"} component={CreateRedacteurPage} levelPower={0}/>
                        <PrivateRouteToLevelPower path={"/admin"} component={PanelAdminPage} levelPower={0}/>
                        <Route component={AccueilPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;
