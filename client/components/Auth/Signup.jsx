import React from 'react'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index.jsx';
import Paper from 'material-ui/lib/paper';

let Signup = ({ dispatch, change}) => {
  let username;
  let password;

  const style = {
    height: 240,
    width: 300,
    margin: '30px auto',
    textAlign: 'center',
    backgroundColor: 'rgb(255, 250, 240)'
  };

  const handleSubmit = e => {
    e.preventDefault();
    $.post( "/signup", {username: username.value, password: password.value})
      .done(function(res) {
        dispatch(setUser(res));
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
    <div className="card">
      <Paper style={style} zDepth={4}>

        <h3 className="header">Register</h3>
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
      </Paper>
    </div>
  )
}

Signup = connect()(Signup)

export default Signup
