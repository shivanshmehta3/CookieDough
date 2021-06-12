import {Component} from 'react';
import {connect} from 'react-redux';
import {setError} from '../../Redux/Reducers/GlobalData/ActionCreater';

class ErrorBoundary extends Component {
  
    // static getDerivedStateFromError(error) {
    //   // Update state so the next render will show the fallback UI.
    //   return { hasError: true, error};
    // }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      this.props.setError(error.message)
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.props.errorMsg !== '') {
        // You can render any custom fallback UI
        return (
        <div className="alert alert-danger text-center" role="alert">
          {this.props.errorMsg}
        </div>);
      }
      return this.props.children;
    }
  }

  function mapStateToProps(state){
    return{
      errorMsg: state.globalData.errorMsg
    }
  }

  export default connect(mapStateToProps,{setError})(ErrorBoundary);