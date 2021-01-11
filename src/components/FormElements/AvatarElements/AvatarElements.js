import React, { useState, useEffect } from 'react';

import defaultAvatar from '../../../assets/images/default-avatar.png';
import Button from '../../UI/Button/Button';
import * as validators from '../../../util/validators';

import styles from './AvatarElements.module.css';

const SignUpElements = props => {
	const [avatarSelector, setAvatarSelector] = useState();
	const [avatarPreview, setAvatarPreview] = useState();
	const maxImgSize = 4 * 1024 * 1024;

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
			validators.isValidImg(maxImgSize, file.size, file.type)
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
		props.setAvImg(() => undefined);
		props.setAvImgValid(() => true);
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
		</React.Fragment>
	);
};

export default SignUpElements;
