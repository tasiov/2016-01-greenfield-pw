import React from 'react'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index.jsx';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

let Signup = ({ dispatch, change}) => {
  let username;
  let password;

  // Styling for Paper component
  const style = {
    height: 240,
    width: 300,
    margin: '30px auto',
    textAlign: 'center',
    backgroundColor: 'rgb(255, 250, 240)'
  };

  /*  This function is called when the user submits their
   *  username and password. A post request is made to the
   *  signup endpoint using username and password.
   */
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
        <input type="text" name="username" placeholder="Username" ref={(ref) => username = ref} />
        <br/>
        <input type="password" name="password" placeholder="Password" ref={(ref) => password = ref} />
        <br/>
        <RaisedButton label="Submit" onMouseDown={handleSubmit}/>
        <br/>
        <div className="card-help">
          <a href="#" onClick= {changePage} >Login</a>
        </div>
      </Paper>
    </div>
  )
}

Signup = connect()(Signup)

export default Signup
