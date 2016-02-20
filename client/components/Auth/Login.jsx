import React from 'react'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index.jsx';

let Login = ({ dispatch, change, page}) => {
  let username;
  let password;

  let handleSubmit = e => {
    e.preventDefault();
    console.log('username: ', username.value);
    console.log('password: ', password.value);
    $.post( "/login", {username: "username", password: "password"})
      .done(function(res) {
        dispatch(setUser({username: "username", password: "password"}));
      })
      .fail(function(res) {
        console.log('error: ', res);
      });
  }

  let changePage = e => {
    e.preventDefault();
    change('Signup');
  }

  return (
    <div className="login-card">
      <h1>Login</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" ref={(ref) => username = ref} />
        <br/>
        <input type="password" name="password" placeholder="Password" ref={(ref) => password = ref} />
        <br/>
        <input type="submit" />
      </form>

      <div className="login-help">
        <a href="#" onClick= {changePage} >Signup</a>
      </div>
    </div>
  )
}

Login = connect()(Login)

export default Login


// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleSubmit: (e, username, password) => {
//       e.preventDefault();
//       console.log('username: ', username);
//       console.log('password: ', password);
//       $.post( "/login", {username: "username", password: "password"})
//         .done(function(res) {
//           dispatch(setUser({username: "username", password: "password"}));
//         })
//         .fail(function(res) {
//           console.log('error: ', res);
//         })
//     }
//   }
// }
