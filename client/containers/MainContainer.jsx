import { connect } from 'react-redux';
import { changePage, removeUser } from '../actions/index.jsx';
import Main from '../components/Main/Main.jsx';

//Manages data for Main component.

// It maps the state.user object to the
//user prop on Main
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

//it also injects a logoutUser function as a prop to enable
//a dispatch to the store which will logout the user
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      $.get('/logout')
      .done((res) => {
        dispatch(removeUser());
      })
      .fail((res) => {
        console.log('err: ', res);
      });
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer;