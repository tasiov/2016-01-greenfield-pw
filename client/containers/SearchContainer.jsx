import { connect } from 'react-redux';
import { setSearchResults } from '../actions/index.jsx';
import { setFood, deleteFood } from '../actions/index.jsx';
import Search from '../components/Main/Search.jsx';

//Manage data for the Search Component

//Map the foodQueries value on the state object to the 
//foodList prop on the Search component
const mapStateToProps = (state) => {
  return {
    foodList: state.foodQueries,
  }
}

//Injects two methods as props to the Search Component. The
//first, queryFoods, queries the server for all foodObjects
//the match a query string and then creates foodObjs which acts
//like a lookup for each food item's profile (fields) where the key is the
//id of the food item. It then dispatches this foodObjs to the store's
//state for saving. The select food method dispatches to the store any
//food item that was selected for eventual logging
const mapDispatchToProps = (dispatch) => {
  return {
    queryFoods: (query) => {
      $.post( "/search", {"query": query})
        .done(function(res) {
          if (typeof res === "string") {
            res = JSON.parse(res);
          }
          let foodObjs = {};
          res.hits.forEach( (foodEntry) => {
            let id = foodEntry['_id'];
            let fields = foodEntry['fields'];
            foodObjs[id] = fields;
          });
          dispatch(setSearchResults(foodObjs));
        })
        .fail(function(res) {
          console.log('error: ', res);
        });
    },
    selectFood: (food) => {
      dispatch(setFood(food));
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer;
