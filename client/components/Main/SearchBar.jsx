import React from 'react';
import { connect } from 'react-redux';


let SearchBar = () => {
  let query;

  let handleQuery = e => {
    console.log('query :', query.value);

  }

  return (
    <div className='search-bar'>
      <h3>SearchBar</h3>
      <input type="text" onChange={handleQuery} placeholder="What did you eat?" ref={(ref) => query = ref} />
      <button>Enter</button>
    </div>
  );
}

SearchBar = connect()(SearchBar)

export default SearchBar;

// import React from 'react'
// import { setUser } from '../../actions/index.jsx';

// let Login = ({ dispatch, change, page}) => {
//   let username;
//   let password;

//   let handleSubmit = e => {
//     e.preventDefault();
//     console.log('username: ', username.value);
//     console.log('password: ', password.value);
//     $.post( "/login", {username: "username", password: "password"})
//       .done(function(res) {
//         dispatch(setUser({username: "username", password: "password"}));
//       })
//       .fail(function(res) {
//         console.log('error: ', res);
//       });
//   }

//   let changePage = e => {
//     e.preventDefault();
//     change('Signup');
//   }

//   return (
//     <div className="login-card">
//       <h1>Login</h1>
//       <br/>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="Username" ref={(ref) => username = ref} />
//         <br/>
//         <input type="password" name="password" placeholder="Password" ref={(ref) => password = ref} />
//         <br/>
//         <input type="submit" />
//       </form>

//       <div className="login-help">
//         <a href="#" onClick= {changePage} >Signup</a>
//       </div>
//     </div>
//   )
// }


// export default Login
