import './FancyButton.css'

function FancyButton(props){
    return(
        <button className= 'button-style'>{props.children}</button>
    )
}

export default FancyButton;