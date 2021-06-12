import Loader from './Components/Loader/Loader';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import Header from './Header/Header';
import './css/main.min.css';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// import '../node_modules/@popperjs/core/dist/umd/popper.min.js'
// import 'popper.js';
// import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle'

function App(props) {
  // throw Error('random error');
  return (
    <div>
      {props.showLoaderCount>0? <Loader coverScreen= {false}/>: null}
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home'/>
          </Route>
          <Route exact path='/home' component={HomePage}/>
          <Route path='/login' component= {LoginPage}/>
        </Switch>
      </Router>
    </div>
    );
}
function mapStateToProps(state){
  return{
    showLoaderCount: state.globalData.showLoaderCount
  }
}

export default connect(mapStateToProps)(App);
