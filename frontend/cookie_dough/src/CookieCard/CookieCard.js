// import './CookieCard.css';
// import FancyButton from '../Components/FancyButton/FancyButton';

function CookieCard(props){
    return(
        <div className ="card m-3" id = {props.id}>
            <img src={'cookie.jpg'} className="card-img-top" alt="cookie"/>
            <div className ="card-body">
                <h4 className ="card-title">{props.cookieName}</h4>
                <p className ="card-text">{props.description}</p>
            </div>
            <div className = "card-footer d-flex justify-content-end">
                <a href="/#" className ="btn btn-outline-dark">Add to Cart</a>
            </div>
        </div>
    )
}

export default CookieCard;