import { connect } from 'react-redux';
import { changePage } from '../actions/index.jsx';
import Auth from '../components/Auth/Auth.jsx';


const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

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


