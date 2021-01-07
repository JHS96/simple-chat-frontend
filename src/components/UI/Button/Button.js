const button = props => (
	<input
		className={props.btnClass}
		type='submit'
		value={props.value}
		onClick={props.clicked}
	/>
);

export default button;
