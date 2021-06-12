import {Link} from 'react-router-dom';

function BrandName(props){
    return(
        <Link to='/home' className="navbar-brand col-6 col-lg-3 text-center">
            Cookie Dough
        </Link>
    );
}

export default BrandName;