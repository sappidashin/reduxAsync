import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions/actions'


class Posts extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		const {dispatch, selectedSubreddit} = this.props
		dispatch(fetchPostsIfNeeded(selectedSubreddit))
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.selectedSubreddit != this.props.selectedSubreddit){
			const {dispatch, selectedSubreddit} = nextProps
			dispatch(fetchPostsIfNeeded(selectedSubreddit))
		}
	}

	render(){
		const { selectedSubreddit, items, isFetching } = this.props

		if(items.length === 0 )
			return isFetching ? <h2>Loading...</h2> : <h2>No Data.</h2>
		else
			return (
				<ul>
					{items.map((item, i) => <li key={'post_' + i}>{item.title}</li>)}
				</ul>
			)
	}
}


Posts.PropTypes = {	
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	selectedSubreddit: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	const {	postsBySubreddit, selectedSubreddit } = state;
	const {items, isFetching} = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: []}

	return {
		selectedSubreddit,
		items,
		isFetching
	}
}

Posts = connect(
	mapStateToProps	
)(Posts)

export default Posts

