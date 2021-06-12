import './Loader.css';
import cookieShadow from '../../resources/CookieShadow.svg';

function Loader(props){
    let style = {
        'background': 'rgba(255, 222, 173, 0.75)'
    }
    if(!props.coverScreen){
        style = {
            'background': 'transparent'
        }
    }
    return(
        <div style = {style} className= 'div-loader'>
            <img className= 'loader-image' src= 'cookielogo.png' alt='loader'></img>
            <img className= 'loader-shadow-image' src= {cookieShadow} alt= 'sub_loader'/>
        </div>
    );
}

export default Loader;