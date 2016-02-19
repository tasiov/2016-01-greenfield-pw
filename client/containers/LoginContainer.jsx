// import { connect } from 'react-redux';
// import { setUser } from '../actions/index.jsx';
// import Login from '../components/Login.jsx';



// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUser: (callback) => {
//       $.get('http://localhost:3000/login')
//       .done((resp)=>{
//         dispatch(setUser(resp));
//       })
//       .fail((resp) => {
//         console.log('error:', resp);
//       });
//     }
//   }
// }

// const LoginContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginContainer)

// export default LoginContainer
