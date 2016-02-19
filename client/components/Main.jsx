import React from 'react';
import NavBar from './NavBar.jsx';
import CalorieLog from './CalorieLog.jsx';
import RecordMeals from './RecordMeals.jsx';
import Summary from './Summary.jsx';

const Main = ({page}) => {
  var currentPage;
  if(page === 'Summary') {
    currentPage = <Summary />;
  } else if(page === 'CalorieLog') {
    currentPage = <CalorieLog />;
  } else if(page === 'RecordMeals') {
    currentPage = <RecordMeals />;
  }

  return (
    <div className='main-page'>
      <NavBar />
      {currentPage}
    </div>
    );
}

export default Main;
