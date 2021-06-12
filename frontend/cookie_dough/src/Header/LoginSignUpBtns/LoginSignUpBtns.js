import {Link} from 'react-router-dom';

function LoginSignUpBtns(props){
    return(
    <div className="col-12 col-lg-3 d-flex justify-content-end">
        <Link to='login'>
            <button type="button" className="btn btn-outline-dark me-2">Login</button>
        </Link>
        <Link to='sign-up'>
            <button type="button" className="btn btn-warning">Sign-up</button>
        </Link>
    </div>
    );
}

export default LoginSignUpBtns;