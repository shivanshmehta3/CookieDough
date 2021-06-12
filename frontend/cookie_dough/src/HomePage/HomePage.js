import Cards from '../Cards/Cards';
import CookieDetailsForm from '../CookieDetailsForm/CookieDetailsForm';
import AddNewCookieBtn from '../Components/AddNewCookieBtn/AddNewCookieBtn';
import CategoryField from '../Components/CategoryField/CategoryField';
import {useState} from 'react';

// import './Body.css';

function HomePage(props){

    let [isShowAddCookieForm, setShowAddCookieForm] = useState(false);

    function handleAddNewCookieForm(isShowForm){
        setShowAddCookieForm(isShowForm);
    }

    return(
        <div>
            <div className= "d-flex flex-row flex-lg-column justify-content-end">
                <CategoryField/>
                <Cards/>
            </div>
            <AddNewCookieBtn onClickHandler = {()=>handleAddNewCookieForm(true)}/>
            {
                isShowAddCookieForm?
                <CookieDetailsForm onCloseHandler= {()=>handleAddNewCookieForm(false)}/>
                :null
            }
        </div>
    );
}

export default HomePage;