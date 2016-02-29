import { connect } from 'react-redux';
import {setTimeOnProgress, setFilterOnProgress} from '../actions/index.jsx';
import ProgressBar from '../components/Main/ProgressBar.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
  	timeWindow: state.progressBar.timeWindow,
  	filter: state.progressBar.filter,
  	nutrByDate: ownProps.nutrByDate
  };
}

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