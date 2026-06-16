import "./Navbar.css";
import ImgLogo from "./logo.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="navbar">
            <div className="brand-container" onClick={() => navigate("/")}>
                <img src={ImgLogo} alt="EasyRent Logo" className="navbar-logo"/>
                <h2>EasyRent</h2>
            </div>

            <div className="nav-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>

                <Link to="/properties" className="nav-link">
                    Properties
                </Link>

                <Link to="/about" className="nav-link">
                    About
                </Link>
            </div>
        </div>
    );
}

export default Navbar;