import {useState} from 'react'

function SearchForm(props){
    let [inputValue, setInputValue] = useState({inputValue: ''});
    function handleInputChange(e){
        e.preventDefault();
        setInputValue(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(inputValue);
    }
    return(
        <form className="col-12 col-lg-5 d-flex justify-content-end my-2 my-lg-0" onSubmit= {handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange= {handleInputChange}/>
            <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>);
}

export default SearchForm;