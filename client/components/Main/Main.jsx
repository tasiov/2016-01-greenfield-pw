import React from 'react';
import NavBar from './NavBar.jsx';
import AppBar from 'material-ui/lib/app-bar.js';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';

const colors = styles.Colors;


const Main = ({user, logoutUser}) => {
// const Main = ({page, user}) => {
  // let currentPage;
  // if(page === 'Summary') {
  //   currentPage = <Summary user={user} />;
  // } else if(page === 'CalorieLog') {
  //   currentPage = <CalorieLog user={user} />;
  // } else if(page === 'RecordMeals') {
  //   currentPage = <RecordMeals user={user} />;
  // } else {
  //   currentPage = <Summary user={user} />;
  // }

  return (
    <div className='main-page'>
      <AppBar title="Eat.ly" titleStyle={{"textAlign":"center"}}
       iconElementRight={ <FlatButton label="Log Out" color={colors.lightBlue50} onClick={logoutUser}/> }
       iconElementLeft={ <Avatar
          color={colors.lightBlue500}
          backgroundColor={colors.lightBlue50}
        >
          {user.userInfo.username.slice(0,1)}
        </Avatar>
        }
      />
      <NavBar user={user}/>
    </div>
    );
        // {currentPage}
}

export default Main;
