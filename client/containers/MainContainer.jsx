import { connect } from 'react-redux';
import { changePage, removeUser } from '../actions/index.jsx';
import Main from '../components/Main/Main.jsx';


const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user
  }
}

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