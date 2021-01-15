import React, { useState } from 'react';

import Tooltip from '../../UI/Tooltip/Tooltip';
import * as validators from '../../../util/validators';

const EmailElements = props => {
	const [visibleLabel, setVisibleLabel] = useState(false);

	const emailChangeHandler = event => {
		const input = event.target.value;
		props.setMail(input);
		// setIsEmailValid to true to remove inputError class when user starts typing
		props.setMailValid(true);
		// onBlur() check email validity
		if (event.type === 'blur') {
			props.setMailValid(validators.isValidEmail(input));
		}
	};

	return (
		<React.Fragment>
			<label className='inputLabel'>
				{visibleLabel ? 'Email Address' : null}
			</label>
			<input
				className={!props.mailIsValid ? 'inputError' : null}
				type='email'
				name='email'
				id='email'
				placeholder='Email address'
				onChange={event => {
					setVisibleLabel(true);
					emailChangeHandler(event);
				}}
				onBlur={emailChangeHandler}
				value={props.val}
			/>
			<Tooltip
				cssForContent={[
					'Content-Wide--Arrow-Top-Center',
					'Text-Centered',
					'Text-Small',
					'Text-White'
				]}
				visible={!props.mailIsValid}
				text='Please enter a valid email address, eg. name@example.com'
			/>
		</React.Fragment>
	);
};

export default EmailElements;
