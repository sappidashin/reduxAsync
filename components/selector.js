import React, { PropTypes } from 'react'

const Selector = ( { options, handleChange } ) => (
	<select onChange={handleChange}>
		{options.map(option => <option key={Selector.optionsCounter++} value={option} >{option}</option>)}
	</select>
)

Selector.optionsCounter = 0;

Selector.PropTypes = {
	options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	handleChange: PropTypes.func.isRequired
};

export default Selector;
