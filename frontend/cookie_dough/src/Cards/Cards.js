import CookieCard from '../CookieCard/CookieCard';
import {getCookieDataAsync, incShowLoaderCount} from '../Redux/Reducers/GlobalData/ActionCreater'; 
import {connect} from 'react-redux';
import {ScrollSpy} from 'bootstrap';

import {useEffect, Fragment, createRef} from 'react';

function Cards(props){
    let refDivScrollSpy = createRef();
    useEffect(()=>{
        props.getCookieDataAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        if(refDivScrollSpy.current && props.cookieCategories.length>0){
            new ScrollSpy(document.body, {
                target: '#categoryField',
                offset: props.categoryFieldHeight + props.headerHeight
            })
            return (()=>{});
        }
    },[props, refDivScrollSpy]);
    

    let cookieCardGroups = props.cookieCategories.map((category)=>{
        let cookieCardsFilteredArr = props.cookies.filter((cookie)=> cookie.CATEGORY === category);
        let cookieCards = cookieCardsFilteredArr.map((cookie)=>{
            return(
                <CookieCard cookieName= {cookie.NAME} description= {cookie.DESCRIPTION} price= {cookie.PRICE_RS} id= {cookie._id} key={cookie._id}/>
            );
        });
        return(
            <Fragment key={category}>
                <h3 className='ms-3' id={category.replace(/\s+/g, '').trim()}>{category}</h3>
                <hr/>
                <div className= 'd-flex justify-content-evenly flex-wrap'>
                    {cookieCards}
                </div>
            </Fragment>
        );
    });
    return(
        <div ref= {refDivScrollSpy} id="div-cards" className= "position-relative d-flex flex-column col-12 topH-56 topH-lg-112" tabIndex="0">
            {cookieCardGroups}
        </div>
    );    
}

function mapStateToProps(state){
    return({
        headerHeight: state.globalStyle.headerHeight,
        categoryFieldHeight: state.globalStyle.categoryFieldHeight,
        cookies: state.globalData.cookieData,
        cookieCategories: state.globalData.cookieCategories,
        showLoaderCount: state.globalData.showLoaderCount
    });
}

export default connect(mapStateToProps,{getCookieDataAsync, incShowLoaderCount})(Cards);