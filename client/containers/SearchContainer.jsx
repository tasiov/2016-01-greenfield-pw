import { connect } from 'react-redux';
import { setSearchResults } from '../actions/index.jsx';
import { setFood, deleteFood } from '../actions/index.jsx';
import Search from '../components/Main/Search.jsx';

const mapStateToProps = (state) => {
  return {
    foodList: state.foodQueries,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryFoods: (query) => {
      $.post( "/search", {"query": query})
        .done(function(res) {
          console.log('res: ', res.body);
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
          console.log('post failure');
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
