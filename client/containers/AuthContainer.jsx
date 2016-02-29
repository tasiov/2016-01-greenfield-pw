import { connect } from 'react-redux';
import { changePage } from '../actions/index.jsx';
import Auth from '../components/Auth/Auth.jsx';

//Manages data for the Auth component

//It matches the user.state value to the page prop on auth
//so auth knows which page to display. It also injects a 
const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

//This container also injects a changePage function to
// Auth which will dispatch any change in the page to the store
const mapDispatchToProps = (dispatch) => {
	return {
  	changePage: (newPage) => {
    	dispatch(changePage(newPage));
  	}
  }
}

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)

export default AuthContainer;



