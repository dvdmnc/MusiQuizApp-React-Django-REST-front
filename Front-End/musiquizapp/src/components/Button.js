import { Link } from "react-router-dom"
import '../App.css';

export default function Button({link, text, set}) {
    return(
        <Link to={`${link}`} state={{ choice: `${text}`, set }} style={{textDecoration: 'none', }}>
            <div className="button">
                <h2>{text}</h2>
            </div>
        </Link>
) 
}