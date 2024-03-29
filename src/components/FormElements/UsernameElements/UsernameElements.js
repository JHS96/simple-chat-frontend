import React, { useState } from 'react';

import Tooltip from '../../UI/Tooltip/Tooltip';
import * as validators from '../../../util/validators';

const UsernameElements = props => {
	const [visibleLabel, setVisibleLabel] = useState();

	const userNameChangeHandler = event => {
		const name = event.target.value;
		const userNameMinLength = props.nameMinLng;
		const userNameMaxLength = props.nameMaxLng;
		props.setName(name);
		// onBlur() event, check the validity of the entire entered string (& return to prevent further code execution)
		if (event.type === 'blur') {
			return props.setNameValid(
				validators.isValidString(
					event.target.value,
					userNameMinLength,
					userNameMaxLength
				)
			);
		}
		// onChange() event, if name is at least 1 character but not yet min length, check validity of last typed character
		if (name.length > 0 && !validators.isMinLength(name, userNameMinLength)) {
			props.setNameValid(validators.isValidCharacters(name[name.length - 1]));
		} else {
			// Else if name is min length or greater, check validity of entire name string
			props.setNameValid(
				validators.isValidString(
					event.target.value,
					userNameMinLength,
					userNameMaxLength
				)
			);
		}
	};

	return (
		<React.Fragment>
			<label className='inputLabel'>{visibleLabel ? 'Username' : null}</label>
			<input
				className={!props.nameValid ? 'inputError' : null}
				type='text'
				name='username'
				id='username'
				placeholder='Username'
				onChange={event => {
					userNameChangeHandler(event);
					setVisibleLabel(true);
				}}
				onBlur={userNameChangeHandler}
				value={props.name}
			/>
			<Tooltip
				cssForContent={[
					'Content-Wide--Arrow-Top-Center',
					'Text-Centered',
					'Text-Small',
					'Text-White'
				]}
				visible={!props.nameValid}
				text='Must be 3 to 15 characters. Valid characters: A-Z, a-z, 0-9, space, - , _  (Spaces at beginning/end will be ignored.)'
			/>
		</React.Fragment>
	);
};

export default UsernameElements;
