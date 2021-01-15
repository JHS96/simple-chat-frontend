import React, { useState } from 'react';

import Tooltip from '../../UI/Tooltip/Tooltip';
import * as validators from '../../../util/validators';

const PasswordElements = props => {
	const [visibleLabel, setVisibliLabel] = useState(false);

	const passwordChangeHandler = event => {
		const enteredPassword = event.target.value;
		const passwordMinLength = props.pwMinLng;
		const passwordMaxLength = props.pwMaxLng;
		props.setPw(enteredPassword);
		// onBlur() check that passord length is acceptable. Actual validation to be done by backend
		if (event.type === 'blur') {
			return props.setPwAcceptableLng(
				validators.isValidLength(
					enteredPassword,
					passwordMinLength,
					passwordMaxLength
				)
			);
		}
		// Remove inputError class when password reaches min length. Add inputError class if password exceeds max length
		if (validators.isMinLength(enteredPassword, passwordMinLength)) {
			props.setPwAcceptableLng(true);
		}
		if (validators.maxLengthExceeded(enteredPassword, passwordMaxLength)) {
			props.setPwAcceptableLng(false);
		}
	};

	return (
		<React.Fragment>
			<label className='inputLabel'>{visibleLabel ? 'Password' : null}</label>
			<input
				className={!props.acceptableLng ? 'inputError' : null}
				type='password'
				name='password'
				id='password'
				placeholder='Password'
				onChange={event => {
					setVisibliLabel(true);
					passwordChangeHandler(event);
				}}
				onBlur={passwordChangeHandler}
				value={props.val}
			/>
			<Tooltip
				cssForContent={[
					'Content-Wide--Arrow-Top-Center',
					'Text-Centered',
					'Text-Small',
					'Text-White'
				]}
				visible={!props.acceptableLng}
				text='Password must be at least 6 characters, and no more than 32 characters long.'
			/>
		</React.Fragment>
	);
};

export default PasswordElements;
