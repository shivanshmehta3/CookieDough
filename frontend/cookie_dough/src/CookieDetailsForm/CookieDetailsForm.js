// import Loader from '../Components/Loader/Loader';
import axios from 'axios';
import {getCookieDataAsync,incShowLoaderCount, decShowLoaderCount, setError} from '../Redux/Reducers/GlobalData/ActionCreater'; 
import {connect} from 'react-redux';
import {Component} from 'react';

class CookieDetailsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            cookieName: '',
            description: '',
            moreDetails: '',
            category: this.props.cookieCategories[0],
            quantity: '',
            price: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleNameChange(fieldName, e){
        this.setState({...this.state, [fieldName]: e.target.value});
    }

    addCookieUrl = "http://localhost:3001/cookie/add";

    handleSubmit(e){
        e.preventDefault();
        let form = document.getElementById('cookieDetailsForm');
        let cookieNameField = document.getElementById('inputCookieName');
        let isCorrectCookieName = !this.props.cookies.find((cookie)=>{
            return this.state.cookieName.toLowerCase() === cookie.NAME.toLowerCase();
        })
        let isFormValid = form.checkValidity();
        form.classList.add('was-validated')
        console.log(isCorrectCookieName);
        if(isCorrectCookieName) {
            cookieNameField.classList.remove('is-invalid')
        }
        if (!isFormValid || !isCorrectCookieName) {
            if(!isCorrectCookieName){
                cookieNameField.classList.add('is-invalid')
                form.classList.remove('was-validated');
            }
            e.stopPropagation()
        }
        else{
            this.props.incShowLoaderCount();
            axios.post(this.addCookieUrl, {
                NAME: this.state.cookieName,
                DESCRIPTION: this.state.description,
                MORE_DETAILS: this.state.moreDetails,
                CATEGORY: this.state.category,
                QUANTITY_IN_STOCK: parseInt(this.state.quantity),
                PRICE_RS: parseInt(this.state.price)
            },{
            timeout: 5000
            }).then((res)=>{
                if(res.status === 200){
                    this.props.getCookieDataAsync();
                }
            }).catch((err)=>{
                this.props.setError(err.message);
                console.log(err);
            }).finally(()=>{
                this.props.decShowLoaderCount();
                this.props.onCloseHandler();
            });
        }
    }
    
    render(){
        let categoryOptions = this.props.cookieCategories.map((val)=>{
            return(
                <option key={val}>{val}</option>
            );
        });
        return(
            <div className= "cookie-detail-form alert alert-light alert-dismissible fade show fixed-top col-12 h-100 overflow-scroll" role="alert">
                <div className= "d-flex flex-column col-12 text-center">
                    <h4>Add New Cookie</h4>
                    <div><hr/></div>
                    <div className= "d-flex justify-content-center text-start">
                        <form className= "col-6 form-light needs-validation" noValidate onSubmit={this.handleSubmit} id='cookieDetailsForm'>
                            <div className="mb-3">
                                <label htmlFor="inputCookieName" className="form-label">Name</label>
                                <input type="text" className="form-control" required id="inputCookieName" placeholder="Enter cookie name" onChange={(e)=>this.handleNameChange('cookieName', e)} value= {this.state.cookieName}/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide a unique cookie name.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDescription" className="form-label">Description</label>
                                <input type="text" className="form-control" required id="inputDescription" placeholder="Enter short description" onChange={(e)=>this.handleNameChange('description', e)} value= {this.state.description}/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide a description.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputMoreDetails" className="form-label">More Details</label>
                                <textarea type="text" className="form-control" required id="inputMoreDetails" placeholder="Enter more details (eg. ingredients)" onChange={(e)=>this.handleNameChange('moreDetails', e)} value= {this.state.moreDetails}/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide more details about this cookie.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectCategory" className="form-label">Select Category</label>
                                <select className="form-select" required id= "selectCategory" aria-label="Select category" onChange={(e)=>this.handleNameChange('category', e)} value={this.state.category}>
                                    {categoryOptions}
                                </select>
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputAvailableQuantity" className="form-label">Available Quantity</label>
                                <input type="number" className="form-control" required id="inputAvailableQuantity" placeholder="Enter quantity in stock"  onChange={(e)=>this.handleNameChange('quantity', e)} value= {this.state.quantity}/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide available quantity.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPrice" className="form-label">Price</label>
                                <input type="number" className="form-control" required id="inputPrice" placeholder="Enter Price"  onChange={(e)=>this.handleNameChange('price', e)} value= {this.state.price}/>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please provide a price.</div>
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick= {this.props.onCloseHandler}></button>
            </div>
        );
    }
}
function mapStateToProps(state){
    return({
        cookieCategories: state.globalData.cookieCategories,
        cookies: state.globalData.cookieData
    });
}

export default connect(mapStateToProps, {getCookieDataAsync,incShowLoaderCount,decShowLoaderCount,setError})(CookieDetailsForm);