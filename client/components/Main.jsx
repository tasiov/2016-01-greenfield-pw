import React from 'react';

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
    <div className='nav-bar'>
      <NavBar />
    </div>
    <div className='curr-page'>
      {currentPage}
    </div>
    );
}


export default Main;
