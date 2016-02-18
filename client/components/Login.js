class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let username = this.state.username.trim();
    let password = this.state.password.trim();
    if (!password || !username) {
      return;
    }
    // Send request to the server
    $.post( "/login", {username: username, password: password})
    .done(function(res) {
      console.log('succes: ', res);
    })
    .fail(function(res) {
      console.log('error: ', res);
    })
    this.setState({username: '', password: ''});
  }

  render() {
    return (
      <div className="login-card">
        <h1>Login</h1>
        <br/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)} />
          <br/>
          <input type="password" placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)} />
          <br/>
          <input type="submit" />
        </form>

        <div className="login-help">
          <a href="#">Register</a>
        </div>
      </div>
    )
  }
}

window.Login = Login;
