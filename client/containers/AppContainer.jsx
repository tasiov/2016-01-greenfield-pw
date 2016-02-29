import { connect } from 'react-redux';
import { setUser } from '../actions/index.jsx';
import App from '../components/App.jsx';

//App Container performs data management for the App component

//It attaches the user Object on the state to the App's user prop
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

//And creates a method which grabs the user from the API based on
//session validation and dispatches the result to the state for assignment
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: (callback) => {
      $.get('http://localhost:3000/login')
      .done((resp)=>{
        dispatch(setUser(resp));
      })
      .fail((resp) => {
        console.log('error:', resp);
      });
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;


