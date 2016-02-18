class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  // authAttempt(user,pw){

  // }

  render() {
    // if (!this.state.user){
      return (
        <div>
          <form method="post" submit="authAttempt">
            <input type="text"/>
          </form>
        </div>
      )
    }
  // }
}

window.Login = Login;