import './InputField.css';

function InputField(props){
    return(<input className= 'input-field' placeholder= {props.disc} onChange= {props.onChangeHandler}></input>);
}

export default InputField;