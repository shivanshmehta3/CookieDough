import NavLinks from './NavLinks/NavLinks'
import SearchForm from './SearchForm/SearchForm';
import LoginSignUpBtns from './LoginSignUpBtns/LoginSignUpBtns';
import BrandName from './BrandName/BrandName';
import NavbarToggleBtn from './NavbarToggleBtn/NavbarToggleBtn';
import {updateHeaderHeight} from '../Redux/Reducers/GlobalStyle/ActionCreater';
import {setCurrentPath} from '../Redux/Reducers/GlobalData/ActionCreater';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { Fragment } from 'react';
function Header(props){
    const headerId = "appHeader";
    let navClassHome = "navbar navbar-expand-lg navbar-light bg-light";
    let navClassLogin = "navbar navbar-expand-lg navbar-light bg-transparent";
    useEffect(()=>{
        props.history.listen((location)=>{
            console.log('listener',location);
          props.setCurrentPath(location.pathname);
        });
        // eslint-disable-next-line
      },[]);
    useEffect(()=>{
        let appHeader = document.getElementById(headerId);
        props.updateHeaderHeight(appHeader.offsetHeight)
        // console.log(props.currentPath);
    },[props])
    return(
        <header className='fixed-top' id={headerId}>
            <nav className={props.currentPath==='/home' ? navClassHome: navClassLogin}>
                <div className="container-fluid">
                    <BrandName/>
                    {
                        props.currentPath==='/home' ?
                        <Fragment>
                            <NavbarToggleBtn/>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <SearchForm/>
                                <NavLinks/>
                                <LoginSignUpBtns/>
                            </div>
                        </Fragment>: 
                        null
                    }
                </div>
            </nav>
        </header>
    );
}

function mapStateToProps(state){
    return{
      currentPath: state.globalData.currentPath
    }
}

export default connect(mapStateToProps, {updateHeaderHeight, setCurrentPath})(withRouter(Header));