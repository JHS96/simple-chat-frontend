import React, { useState, useEffect } from 'react';

import defaultAvatar from '../../../assets/images/default-avatar.png';
import Button from '../../UI/Button/Button';
import Tooltip from '../../UI/Tooltip/Tooltip';
import * as validators from '../../../util/validators';

import styles from './AvatarElements.module.css';

const AvatarElements = props => {
	const [avatarSelector, setAvatarSelector] = useState();
	const [avatarPreview, setAvatarPreview] = useState();
	const maxImgSize = 4 * 1024 * 1024;
	const errorMsg = 'Allowed images: .png, .jpg, .jpeg - Max 4Mb';

	// Similar to ComponentDidMount, useEffect will execute once render cycle is completed, in this case
	// to setAvatarSelector & setAvatarPreview states
	useEffect(() => {
		setAvatarSelector(document.getElementById('avatar-selector'));
		setAvatarPreview(document.getElementById('avatar-preview'));
	}, []);

	const avatarChangehandler = event => {
		const file = event.target.files[0];
		props.setAvImg(file); // setAvatarImg even if it is undefined
		// If no file was selected or file selection was cancelled, make sure the default avatar is used (no error)
		if (event.target.files.length === 0) {
			avatarPreview.src = defaultAvatar;
			return props.setAvImgValid(true);
		}
		if (
			// If file was chosen, & is 4Mb or less, & is .png/.jpg/.jpeg it is valid
			file &&
			validators.isValidImg(maxImgSize, file.size, file.type)
		) {
			props.setAvImgValid(true);
			const fileReader = new FileReader();
			fileReader.readAsDataURL(avatarSelector.files[0]);
			fileReader.onload = readerEvent => {
				avatarPreview.src = readerEvent.target.result;
			};
		} else {
			// On invalid file, preview = default avatar, img validity = false to display error & setAvatarImg = undefined
			avatarPreview.src = defaultAvatar;
			props.setAvImgValid(false);
		}
	};

	const clearAvatarHandler = event => {
		event.preventDefault();
		avatarSelector.value = '';
		avatarPreview.src = props.customAvatarUrl || defaultAvatar;
		props.setAvImg(undefined);
		props.setAvImgValid(true);
	};

	return (
		<React.Fragment>
			<img
				src={props.customAvatarUrl ? props.customAvatarUrl : defaultAvatar}
				id='avatar-preview'
				alt='avatar-preview'
				className={styles.AvatarPreview}
			/>
			<label id={styles.UploadImgLbl}>
				{props.profilePage
					? 'Select a new profile image below'
					: '*Optional - Upload Profile Image'}
			</label>
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
						cssForButton={['Btn-Small', 'Btn-Danger']}
						value='X'
						clicked={clearAvatarHandler}
					/>
				)}
			</div>
			<Tooltip
				cssForContent={[
					'Content-Wide--Arrow-Top-Center',
					'Text-Centered',
					'Text-Small',
					'Text-White'
				]}
				visible={!props.imgValid}
				text={errorMsg}
			/>
			<hr />
		</React.Fragment>
	);
};

export default AvatarElements;
