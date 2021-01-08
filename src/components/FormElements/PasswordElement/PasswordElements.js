import React, { useState } from 'react';

import * as validators from '../../../util/validators';

const PasswordElements = props => {
	const [visibleLabels, setVisibliLabels] = useState(false);

	const passwordChangeHandler = event => {
		const enteredPassword = event.target.value;
		const passwordMinLength = 6;
		const passwordMaxLength = 32;
		props.setPw(enteredPassword);
		// onBlur() check that passord length is acceptable. Actual validation to be done by backend
		if (event.type === 'blur') {
			return props.setPwAcceptableLng(() =>
				validators.isValidLength(
					enteredPassword,
					passwordMinLength,
					passwordMaxLength
				)
			);
		}
		// Remove inputError class when password reaches min length. Add inputError class if password exceeds max length
		if (validators.isMinLength(enteredPassword, passwordMinLength)) {
			props.setPwAcceptableLng(() => true);
		}
		if (validators.maxLengthExceeded(enteredPassword, passwordMaxLength)) {
			props.setPwAcceptableLng(() => false);
		}
	};

	return (
		<React.Fragment>
			<label className='inputLabel'>{visibleLabels ? 'Password' : null}</label>
			<input
				className={!props.acceptableLng ? 'inputError' : null}
				type='password'
				name='password'
				id='password'
				placeholder='Password'
				onChange={event => {
					setVisibliLabels(() => true);
					passwordChangeHandler(event);
				}}
				onBlur={passwordChangeHandler}
				value={props.val}
			/>
		</React.Fragment>
	);
};

export default PasswordElements;
