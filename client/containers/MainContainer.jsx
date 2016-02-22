import { connect } from 'react-redux';
import { changePage } from '../actions/index.jsx';
import Main from '../components/Main/Main.jsx';


const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user
  }
}


const MainContainer = connect(
  mapStateToProps
)(Main)

export default MainContainer;