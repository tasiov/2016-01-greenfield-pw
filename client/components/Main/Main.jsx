import React from 'react';
import NavBar from './NavBar.jsx';
import CalorieLog from './CalorieLog.jsx';
import RecordMeals from './RecordMeals.jsx';
import Summary from './Summary.jsx';

const Main = ({page, user}) => {
  let currentPage;
  if(page === 'Summary') {
    currentPage = <Summary user={user} />;
  } else if(page === 'CalorieLog') {
    currentPage = <CalorieLog user={user} />;
  } else if(page === 'RecordMeals') {
    currentPage = <RecordMeals user={user} />;
  } else {
    currentPage = <RecordMeals user={user} />;
  }

  return (
    <div className='main-page'>
      <NavBar />
      {currentPage}
    </div>
    );
}

export default Main;
