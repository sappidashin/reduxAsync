import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

let Posts = ({ items, isFetching }) => {

	if(items.length === 0 )
		return isFetching ? <h2>Loading...</h2> : <h2>No Data.</h2>
	else
		return (
			<ul>
				{items.map((item, i) => <li key={'post_' + i}>{item.title}</li>)}
			</ul>
		)
}


Posts.PropTypes = {	
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
	const {	postsBySubreddit, selectedSubreddit } = state;
	const {items, isFetching} = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: []}

	return {
		items,
		isFetching
	}
}

Posts = connect(
	mapStateToProps	
)(Posts)

export default Posts

