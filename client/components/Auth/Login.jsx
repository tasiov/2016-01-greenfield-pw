import React from 'react'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index.jsx';

let Login = ({ dispatch, change}) => {
  let username;
  let password;

  const handleSubmit = e => {
    e.preventDefault();
    $.post( "/login", {username: username.value, password: password.value})
      .done(function(res) {
        dispatch(setUser(res));
      })
      .fail(function(res) {
        console.log('error: ', res);
      });
  }

  const changePage = e => {
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

