import React from 'react'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index.jsx';

let Signup = ({ dispatch, change}) => {
  let username;
  let password;

  const handleSubmit = e => {
    e.preventDefault();
    $.post( "/signup", {username: "username", password: "password"})
      .done(function(res) {
        dispatch(setUser({username: "username", password: "password"}));
      })
      .fail(function(res) {
        console.log('error: ', res);
      });
  }

  const changePage = e => {
    e.preventDefault();
    change('Login');
  }

  return (
    <div className="signup-card">
      <h1>Register</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" ref={(ref) => username = ref} />
        <br/>
        <input type="password" name="password" placeholder="Password" ref={(ref) => password = ref} />
        <br/>
        <input type="submit" />
      </form>

      <div className="signup-help">
        <a href="#" onClick= {changePage} >Login</a>
      </div>
    </div>
  )
}

Signup = connect()(Signup)

export default Signup


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
