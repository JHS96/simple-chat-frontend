import React, { useState } from 'react';

import Logo from '../Logo/Logo';
import Button from '../UI/Button/Button';
import CustomLink from '../UI/CustomLink/CustomLink';
import Modal from '../Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator';
import Tooltip from '../UI/Tooltip/Tooltip';
import { useHttpClient } from '../../custom_hooks/http-hook';
import * as validators from '../../util/validators';
import styles from './ResetPassword.module.css';

const ResetPassword = props => {
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	const [userInput, setUserInput] = useState('');
	const [serverResMsg, setServerResMsg] = useState('');
	const [visibleLabel, setVisibliLabel] = useState(false);
	const [pwIsValidLength, setPwIsValidLength] = useState('wqbv');
	const [pwMinLengthReached, setPwMinLengthReached] = useState(false);
	const [btnEnabled, setBtnEnabled] = useState(false);

	const userId = props.match.params.userId;
	const resetToken = props.match.params.token;
	const passwordMinLength = 6;
	const passwordMaxLength = 32;

	const userInputHandler = e => {
		setUserInput(e.target.value);
		setVisibliLabel(true);

		// The "-1" is a bit of a hack to overcome the async nature of setting state, thereby
		// getting the frontend validation to work correctly.
		if (e.target.value.length === passwordMinLength - 1) {
			setPwMinLengthReached(true);
		}

		// Once password minimum length is reached, show/hide Tooltip, and enable/disable
		// "inputError" class on input (based on validation).
		if (pwMinLengthReached) {
			setPwIsValidLength(
				validators.isValidLength(
					e.target.value,
					passwordMinLength,
					passwordMaxLength
				)
			);

			setBtnEnabled(
				validators.isValidLength(
					e.target.value,
					passwordMinLength,
					passwordMaxLength
				)
			);
		}
	};

	const updatePasswordHandler = async (e, id, token) => {
		e.preventDefault();
		try {
			const body = JSON.stringify({
				userId: id,
				passwordResetToken: token,
				newPassword: userInput
			});
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/account/update-password`,
				'POST',
				body,
				{ 'Content-Type': 'application/json' }
			);
			setServerResMsg(response.message);
		} catch (err) {
			console.log(err);
		}
	};

	const buttonClasses = btnEnabled
		? ['Btn-Dark', 'Btn-Large']
		: ['Btn-Disabled', 'Btn-Large'];

	// While loading, show Loadingindicator instaed of button.
	const buttonEl = isLoading ? (
		<LoadingIndicator size='LoaderLarge' />
	) : (
		<Button
			cssForButton={buttonClasses}
			value='Submit'
			clicked={e => updatePasswordHandler(e, userId, resetToken)}
		/>
	);

	return (
		<React.Fragment>
			{error && (
				<Modal
					header='Whoops...'
					visible={error}
					btnClicked={() => clearError()}>
					{error}
				</Modal>
			)}
			{error && <Backdrop visible={error} clicked={() => clearError()} />}
			
			<div className={styles.Logo}>
				<Logo />
			</div>
			<div className={styles.Container}>
				<h1>New Password</h1>
				<hr />
				{!serverResMsg && (
					<form>
						<label className={styles.InputLabel}>
							{visibleLabel ? 'Password' : null}
						</label>
						<input
							className={!pwIsValidLength ? 'inputError' : null}
							type='password'
							placeholder='Enter your new password here...'
							value={userInput}
							onChange={e => userInputHandler(e)}
						/>
						<div id={styles.Tooltip}>
							<Tooltip
								cssForContent={[
									'Content-Wide--Arrow-Top-Center',
									'Text-Centered',
									'Text-Small',
									'Text-White'
								]}
								visible={!pwIsValidLength}
								text='Password must be at least 6 characters, and no more than 32 characters long.'
							/>
						</div>
						{buttonEl}
					</form>
				)}
				{serverResMsg && (
					<React.Fragment>
						<p>{serverResMsg}</p>
						<CustomLink
							cssForCustLnk={[
								'Text-Centered',
								'Text-Extra-Large',
								'Text-Blue',
								'Text-Bold'
							]}
							text={'Log In'}
							clicked={() => props.history.push('/auth')}
						/>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};

export default ResetPassword;
