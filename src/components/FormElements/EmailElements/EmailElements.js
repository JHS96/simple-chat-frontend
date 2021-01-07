import React, { useState } from 'react';

import * as validators from '../../../util/validators';

const EmailElements = props => {
	const [visibleLabels, setVisibleLabels] = useState(false);

	const emailChangeHandler = event => {
		const input = event.target.value;
		props.setMail(() => input);
		// setIsEmailValid to true to remove inputError class when user starts typing
		props.setMailValid(() => true);
		// onBlur() check email validity
		if (event.type === 'blur') {
			props.setMailValid(() => validators.isValidEmail(input));
		}
	};

	return (
		<React.Fragment>
			<label className='inputLabel'>
				{visibleLabels ? 'Email Address' : null}
			</label>
			<input
				className={!props.mailIsValid ? 'inputError' : null}
				type='email'
				name='email'
				id='email'
				placeholder='Email address'
				onChange={event => {
					setVisibleLabels(() => true);
					emailChangeHandler(event);
				}}
				onBlur={emailChangeHandler}
				value={props.val}
			/>
		</React.Fragment>
	);
};

export default EmailElements;
