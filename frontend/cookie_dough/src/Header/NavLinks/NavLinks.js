function NavLinks(props){
    return(
    <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
        <ul className="navbar-nav col-12 col-lg-auto mb-2 mb-md-0 bg-light">
            <li className="nav-item">
            <a className="nav-link" href="/#">Cart</a>
            </li>
            <li className= "nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/#">My Profile</a></li>
                <li><a className="dropdown-item" href="/#">My Orders</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="/#">Log Out</a></li>
            </ul>
            </li>
        </ul>
    </div>
    );
}

export default NavLinks;