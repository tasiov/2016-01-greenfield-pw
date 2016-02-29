import { connect } from 'react-redux';
import {setTimeOnProgress, setFilterOnProgress} from '../actions/index.jsx';
import ProgressBar from '../components/Main/ProgressBar.jsx';

//manages data for the ProgressBar Component

//Maps the timeWindow and filter values on the state object to the
//ProgressBar's props and also attaches the nutrByDate object, fed as a
//prop to itself (ProgressBarContainer), to the ProgressBar Component
const mapStateToProps = (state, ownProps) => {
  return {
  	timeWindow: state.progressBar.timeWindow,
  	filter: state.progressBar.filter,
  	nutrByDate: ownProps.nutrByDate
  };
}

//Injects two functions as props to ProgressBar, the setTime function and
//setFilter function which will dispatch any change to the state store
const mapDispatchToProps = (dispatch) => {
	return {
		setTime: (newTime) => {
			dispatch(setTimeOnProgress(newTime));
		},
		setFilter: (newFilter) => {
			dispatch(setFilterOnProgress(newFilter));
		}
  };
};

const ProgressBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar)

export default ProgressBarContainer;