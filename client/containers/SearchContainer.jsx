import { connect } from 'react-redux';
import { setSearchResults } from '../actions/index.jsx';
import SearchBar from '../components/Main/SearchBar.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    foodList: state.foodQueries
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    queryFoods: (query) => {
      $.post( "/search", {"query": query})
        .done(function(res) {
          if (typeof res === "string") res = JSON.parse(res);
          dispatch(setSearchResults(res.hits));
        })
        .fail(function(res) {
          console.log('error: ', res);
        });
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default SearchContainer;
