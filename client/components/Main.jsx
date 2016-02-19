import React from 'react';

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

export default Main;
