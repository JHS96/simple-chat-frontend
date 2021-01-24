import { useSelector } from 'react-redux';

const Conversations = () => {
	const user = useSelector(state => state.user);

	return (
		<div>
			<h1>I am a Conversations! More will be added to me later!</h1>
			<p>
				{`For security reasons, you will automatically be logged out at: ${new Date(
					parseInt(user.jwtExpireTime)
				).toLocaleString()}`}
			</p>
		</div>
	);
};

export default Conversations;
