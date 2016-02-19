import { connect } from 'react-redux';
import { setUser } from '../actions/index.jsx';
import App from '../components/App.jsx';



const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

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




// class AppView extends React.Component {

//   constructor(props) {
//     super(props);
//     this.getUser();
//   }

//   getUser() {
//     $.get('http://localhost:3000/login')
//     .done((resp)=>{
//       this.setState(resp);
//     })
//     .fail((resp) => {
//       console.log('error:', resp);
//     });
//   }

//   loginUser(username, password) {
//     var self = this;
//     if (!password || !username) {
//       return;
//     }
//     // Send request to the server
//     $.post( "/login", {username: username, password: password})
//     .done(function(res) {
//       self.setState({username: username, password: password});
//     })
//     .fail(function(res) {
//       console.log('error: ', res);
//     })
//   }


// }


