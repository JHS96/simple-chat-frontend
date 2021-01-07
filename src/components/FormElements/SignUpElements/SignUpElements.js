import React, { useState, useEffect } from 'react';

import defaultAvatar from '../../../assets/images/default-avatar.png';
import Button from '../../UI/Button/Button';
import * as validators from '../../../util/validators';

import styles from './SignUpElements.module.css';

const SignUpElements = props => {
	const [avatarSelector, setAvatarSelector] = useState();
	const [avatarPreview, setAvatarPreview] = useState();
	const [visibleLabels, setVisibleLabels] = useState(false);

	// Similar to ComponentDidMount, useEffect will execute once render cycle is completed, in this case
	// to setAvatarSelector & setAvatarPreview states
	useEffect(() => {
		setAvatarSelector(() => document.getElementById('avatar-selector'));
		setAvatarPreview(() => document.getElementById('avatar-preview'));
	}, []);

	const avatarChangehandler = event => {
		const file = event.target.files[0];
		props.setAvImg(() => file); // setAvatarImg even if it is undefined
		// If no file was selected or file selection was cancelled, make sure the default avatar is used (no error)
		if (event.target.files.length === 0) {
			avatarPreview.src = defaultAvatar;
			return props.setAvImgValid(() => true);
		}
		if (
			// If file was chosen, & is 4Mb or less, & is .png/.jpg/.jpeg it is valid
			file &&
			file.size <= 4 * 1024 * 1024 &&
			(file.type === 'image/png' ||
				file.type === 'image/jpg' ||
				file.type === 'image/jpeg')
		) {
			props.setAvImgValid(() => true);
			const fileReader = new FileReader();
			fileReader.readAsDataURL(avatarSelector.files[0]);
			fileReader.onload = readerEvent => {
				avatarPreview.src = readerEvent.target.result;
			};
		} else {
			// On invalid file, preview = default avatar, img validity = false to display error & setAvatarImg = undefined
			avatarPreview.src = defaultAvatar;
			props.setAvImgValid(() => false);
		}
	};

	const clearAvatarHandler = event => {
		event.preventDefault();
		avatarSelector.value = '';
		avatarPreview.src = defaultAvatar;
		props.setAvImgValid(() => true);
		props.setAvImg(() => undefined);
	};

	const userNameChangeHandler = event => {
		const name = event.target.value;
		const userNameMinLength = 3;
		const userNameMaxLength = 15;
		props.setName(() => name);
		// onBlur() event, check the validity of the entire entered string (& return to prevent further code execution)
		if (event.type === 'blur') {
			return props.setNameValid(() =>
				validators.isValidString(
					event.target.value,
					userNameMinLength,
					userNameMaxLength
				)
			);
		}
		// onChange() event, if name is at least 1 character but not yet min length, check validity of last typed character
		if (name.length > 0 && !validators.isMinLength(name, userNameMinLength)) {
			props.setNameValid(() =>
				validators.isValidCharacters(name[name.length - 1])
			);
		} else {
			// Else if name is min length or greater, check validity of entire name string
			props.setNameValid(() =>
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
			<img
				src={defaultAvatar}
				id='avatar-preview'
				alt='avatar-preview'
				className={styles.AvatarPreview}
			/>
			<label id={styles.UploadImgLbl}>*Optional - Upload Profile Image</label>
			<div className={styles.Avatar} id='avatar'>
				<input
					className={
						!props.imgValid
							? `inputError ${styles.FileInput}`
							: styles.FileInput
					}
					type='file'
					name='avatar-selector'
					id='avatar-selector'
					onChange={avatarChangehandler}
				/>
				{props.avatarImg && (
					<Button
						btnClass='btnSmall btnDanger'
						value='X'
						clicked={clearAvatarHandler}
					/>
				)}
			</div>
			<hr />
			<label className='inputLabel'>{visibleLabels ? 'Username' : null}</label>
			<input
				className={!props.nameValid ? 'inputError' : null}
				type='text'
				name='username'
				id='username'
				placeholder='Username'
				onChange={event => {
					userNameChangeHandler(event);
					setVisibleLabels(() => true);
				}}
				onBlur={userNameChangeHandler}
				value={props.name}
			/>
		</React.Fragment>
	);
};

export default SignUpElements;
