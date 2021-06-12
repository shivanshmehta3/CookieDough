// import './IconButton.css';

function IconButton(props){
    return(
        <div className= 'icon-button'>
            <button className= 'btn btn-outline-dark' onClick= {props.onClickHandler}>
                {props.children}
            </button>
        </div>
    );
}

export default IconButton;