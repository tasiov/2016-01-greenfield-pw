class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('username: ', this.props);
    return (
      <div>
        Hello {this.props.user}!
      </div>
    )
  }
}

window.Main = Main;
