class Main extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    if (!this.state.user){
      return (
        <div>
          {this.state.user.firstName}
          // Hello World
        </div>
      )
    }
  }
}