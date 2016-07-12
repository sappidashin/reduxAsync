import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Selector from '../components/selector'
import { selectSubreddit, invalidateSubreddit, fetchPostsIfNeeded} from '../actions/actions'

let Picker = ({ selectedSubreddit, options, handleChange, lastUpdated, isFetching, handleRefresh }) => {
	return (
		<div>
			<h1>{selectedSubreddit}</h1>
			<Selector options={options} handleChange={(e) => handleChange(e.target.value)} value={selectedSubreddit} />
			<p>
				{
					lastUpdated &&
					<span>Last updated at {new Date(lastUpdated).toLocaleTimeString()} {' '}</span>
				}
				{
					!isFetching &&
					<a href="#" onClick={(e) => handleRefresh(selectedSubreddit, e)}>Refresh</a>
				}
				
			</p>
		</div>
	)
}

Picker.PropTypes = {
	selectedReddit: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
	lastUpdated: PropTypes.number,
	handleRefresh: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	const {	postsBySubreddit, selectedSubreddit } = state;
	const { isFetching, lastUpdated} = postsBySubreddit[selectedSubreddit] || { isFetching: true}

	return {
		selectedSubreddit,
		options: [ 'reactjs', 'frontend' ],
		isFetching,
		lastUpdated
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {	
	return {
		handleChange: (nextReddit) => {
			dispatch(selectSubreddit(nextReddit))
		},
		handleRefresh: (selectedSubreddit, e) => {
			e.preventDefault()

			dispatch(invalidateSubreddit(selectedSubreddit));
			dispatch(fetchPostsIfNeeded(selectedSubreddit));
		}
	}
}

Picker = connect(
	mapStateToProps,
	mapDispatchToProps
)(Picker)

export default Picker