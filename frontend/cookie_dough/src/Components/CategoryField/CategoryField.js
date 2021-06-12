// import './CategoryField.css'
import {connect} from 'react-redux';
import {updateCategoryFieldHeight} from '../../Redux/Reducers/GlobalStyle/ActionCreater';
import {getCookieCategoriesAsync, incShowLoaderCount} from '../../Redux/Reducers/GlobalData/ActionCreater';
import {useEffect} from 'react';

function CategoryField(props){
    const categoryFieldId = 'categoryField';
    useEffect(()=>{
        props.getCookieCategoriesAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        let categoryFieldBar = document.getElementById(categoryFieldId);
        props.updateCategoryFieldHeight(categoryFieldBar.offsetHeight);
    },[props]);
    let listItems = props.cookieCategories.map((val)=>{
        return(
            <li className='nav-item' key= {val+"_li"}>
                <a className="nav-link" href={"#"+val.replace(/\s+/g, '').trim()} key={val}>{val}</a>
            </li>
        );
    });
    return(
        <nav className="navbar fixed-top navbar-light bg-white px-3 d-flex d-none d-lg-block flex-row col-12" style={{top: props.headerHeight}} role="navigation" id={categoryFieldId}>
            <ul className="nav nav-pills nav-fill nav-justified col-lg-12">
                {listItems}
            </ul>
        </nav>
    )
}

function mapStateToProps(state){
    return{
        cookieCategories: state.globalData.cookieCategories,
        headerHeight: state.globalStyle.headerHeight

    }
}

export default connect(mapStateToProps, {updateCategoryFieldHeight, getCookieCategoriesAsync, incShowLoaderCount})(CategoryField);