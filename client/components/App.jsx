import React from 'react';
import Login from './Login.jsx';
import Main from './Main.jsx';


const App = ({user, getUser}) => {
 	getUser();
  if(!user) {
    return (<Login/>);
  } else {
    return (<Main user= {user} />);
  }

 
}


// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.getUser();
//   }


//   render() {
//     if (!this.props.user){
//       return (
//         <Login/>
//       )
//     } else {
//       return (
//         <Main user={this.props.user}/>
//       )
//     }
//   }
// }

export default App;
