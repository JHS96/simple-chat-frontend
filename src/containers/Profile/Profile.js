import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AvatarElements from '../../components/FormElements/AvatarElements/AvatarElements';
import PasswordElements from '../../components/FormElements/PasswordElement/PasswordElements';
import UsernameElements from '../../components/FormElements/UsernameElements/UsernameElements';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { useHttpClient } from '../../custom_hooks/http-hook';
import allActions from '../../redux/actions';
import styles from './Profile.module.css';

const Profile = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [avatarImg, setAvatarImg] = useState();
	const [isAvatarImgValid, setIsAvatarImgValid] = useState(true); // Initialize as true to prevent inputError class from being added to input on initial page load
	const [customAvatarUrl, setCustomAvatarUrl] = useState();
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	const [serverResMsg, setServerResMsg] = useState();

	const [newName, setNewName] = useState('');
	const [isUserNameValid, setIsUserNameValid] = useState('not set'); // Initialize as 'not set' - which is truthy but not explicitly 'true' - to prevent inputError class from being added to input on initial page load
	const userNameMinLength = 3;
	const userNameMaxLength = 15;

	const [newPassword, setNewPassword] = useState('');
	const [isPasswordAcceptableLength, setIsPasswordAcceptableLength] = useState(
		'not set'
	); // Initialize as 'not set' - which is truthy but not explicitly 'true' - to prevent inputError class from being added to input on initial page load
	const passwordMinLength = 6;
	const passwordMaxLength = 32;

	const [isConfirmChecked, setIsConfirmChecked] = useState(false);
	const [isUnderstandChecked, setIsUnderstandChecked] = useState(false);

	useEffect(() => {
		if (user.avatarUrl !== process.env.REACT_APP_DEFAULT_AVATAR) {
			setCustomAvatarUrl(user.avatarUrl);
		} else {
			setCustomAvatarUrl(undefined);
		}
	}, [user.avatarUrl]);

	const ModalEl = () => {
		if (error) {
			return (
				<React.Fragment>
					<Backdrop visible={error} clicked={() => clearError()} />
					<Modal
						visible={error}
						btnClicked={() => clearError()}
						header='Sorry...'>
						<p>{error}</p>
					</Modal>
				</React.Fragment>
			);
		} else if (serverResMsg) {
			return (
				<React.Fragment>
					<Backdrop
						visible={serverResMsg}
						clicked={() => setServerResMsg(null)}
					/>
					<Modal
						visible={serverResMsg}
						btnClicked={() => setServerResMsg(null)}
						header='Success!'>
						<p>{serverResMsg}</p>
					</Modal>
				</React.Fragment>
			);
		} else return null;
	};

	const updateAvatarHandler = async e => {
		e.preventDefault();
		if (avatarImg) {
			const formData = new FormData();
			formData.append('avatar', avatarImg);
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/avatar/update-avatar-image`,
					'PUT',
					formData,
					{ Authorization: `Bearer ${user.token}` }
				);
				setServerResMsg(response.message);
				setAvatarImg(undefined);
				dispatch(allActions.userActions.updateAvatarUrl(response.newAvatarUrl));
			} catch (err) {
				console.log(err);
			}
		}
	};

	const deleteAvatarHandler = async e => {
		e.preventDefault();
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/avatar/delete-avatar-image`,
				'DELETE',
				null,
				{ Authorization: `Bearer ${user.token}` }
			);
			setServerResMsg(response.message);
			setAvatarImg(undefined);
			dispatch(
				allActions.userActions.updateAvatarUrl(
					process.env.REACT_APP_DEFAULT_AVATAR
				)
			);
		} catch (err) {
			console.log(err);
		}
	};

	const updateUserNameHandler = async e => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ newUserName: newName });
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/account/update-username`,
				'POST',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			setServerResMsg(response.message);
			setNewName('');
			dispatch(allActions.userActions.updateUserName(newName));
		} catch (err) {
			console.log(err);
		}
	};

	const updatePasswordHandler = async e => {
		e.preventDefault();
		try {
			const body = JSON.stringify({ newPassword: newPassword });
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/account/update-password`,
				'POST',
				body,
				{
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json'
				}
			);
			setNewPassword('');
			setServerResMsg(response.message);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteAccountHandler = async e => {
		e.preventDefault();
		// If either the confirm or understand chcekbox is not checked, NO NOT proceed with deletion.
		if (!isConfirmChecked || !isUnderstandChecked) {
			return;
		}
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/account/delete-account`,
				'DELETE',
				null,
				{ Authorization: `Bearer ${user.token}` }
			);
			dispatch(allActions.userActions.logout());
		} catch (err) {
			console.log(err);
		}
	};

	const updateImageBtnClasses =
		avatarImg && isAvatarImgValid
			? ['Btn-Dark', 'Btn-Medium-Wide']
			: ['Btn-Dark', 'Btn-Medium-Wide', 'Btn-Disabled'];

	const deleteImageBtnClasses =
		customAvatarUrl && !avatarImg
			? ['Btn-Danger', 'Btn-Medium-Wide']
			: ['Btn-Danger', 'Btn-Medium-Wide', 'Btn-Disabled'];

	const updateUserNameBtnClasses =
		isUserNameValid === true && newName.length >= 3
			? ['Btn-Dark', 'Btn-Wide']
			: ['Btn-Dark', 'Btn-Wide', 'Btn-Disabled'];

	const updatePasswordBtnClasses =
		isPasswordAcceptableLength === true &&
		newPassword.length >= passwordMinLength
			? ['Btn-Dark', 'Btn-Wide']
			: ['Btn-Dark', 'Btn-Wide', 'Btn-Disabled'];

	const deleteAccountBtnClasses =
		isConfirmChecked && isUnderstandChecked
			? ['Btn-Danger', 'Btn-Wide']
			: ['Btn-Danger', 'Btn-Wide', 'Btn-Disabled'];

	return (
		<React.Fragment>
			<ModalEl />
			<h1 className={styles.Heading}>{`Profile - ${user.userName}`}</h1>
			<div className={styles.Container}>
				<div className={styles.AvatarElements}>
					<h3 className={styles.AvatarSectionHeading}>
						Your Current Profile Image
					</h3>
					<AvatarElements
						setAvImg={setAvatarImg}
						setAvImgValid={setIsAvatarImgValid}
						avatarImg={avatarImg}
						imgValid={isAvatarImgValid}
						customAvatarUrl={customAvatarUrl ? user.avatarUrl : null}
						profilePage={true}
					/>
					{isLoading ? (
						<LoadingIndicator size='LoaderLarge' />
					) : (
						<div className={styles.AvatarButtons}>
							<Button
								cssForButton={updateImageBtnClasses}
								value='Update Image'
								clicked={e => updateAvatarHandler(e)}
							/>
							<Button
								cssForButton={deleteImageBtnClasses}
								value='Delete Image'
								clicked={e => deleteAvatarHandler(e)}
							/>
						</div>
					)}
				</div>

				<div className={styles.UserInputFields}>
					<div className={styles.UserNameInput}>
						<UsernameElements
							nameMinLng={userNameMinLength}
							nameMaxLng={userNameMaxLength}
							setName={setNewName}
							name={newName}
							setNameValid={setIsUserNameValid}
							nameValid={isUserNameValid}
						/>
					</div>
					<div className={styles.UpdateNameBtn}>
						{isLoading ? (
							<LoadingIndicator size='LoaderLarge' />
						) : (
							<Button
								cssForButton={updateUserNameBtnClasses}
								value='Update'
								clicked={e => updateUserNameHandler(e)}
							/>
						)}
					</div>

					<div className={styles.PasswordInput}>
						<PasswordElements
							setPw={setNewPassword}
							setPwAcceptableLng={setIsPasswordAcceptableLength}
							pwMinLng={passwordMinLength}
							pwMaxLng={passwordMaxLength}
							acceptableLng={isPasswordAcceptableLength}
							val={newPassword}
						/>
					</div>
					<div className={styles.UpdatePasswordBtn}>
						{isLoading ? (
							<LoadingIndicator size='LoaderLarge' />
						) : (
							<Button
								cssForButton={updatePasswordBtnClasses}
								value='Update'
								clicked={e => updatePasswordHandler(e)}
							/>
						)}
					</div>

					<h2 className={styles.DeleteAccountHeading}>Delete Account</h2>
					<div className={styles.ConfirmContainer}>
						<input
							type='checkbox'
							name='confirm-delete-checkbox'
							className={styles.ConfirmCheckbox}
							onChange={() => setIsConfirmChecked(() => !isConfirmChecked)}
						/>
						<label
							htmlFor='confirm-delete-checkbox'
							className={styles.CheckboxLabel}>
							Confirm account deletion.
						</label>
						<br />
						<input
							type='checkbox'
							name='confirm-understand-checkbox'
							className={styles.ConfirmCheckbox}
							onChange={() =>
								setIsUnderstandChecked(() => !isUnderstandChecked)
							}
						/>
						<label
							htmlFor='confirm-understand-checkbox'
							className={styles.CheckboxLabel}>
							I understand that deletion can't be undone.
						</label>
					</div>
					<div className={styles.UpdatePasswordBtn}>
						{isLoading ? (
							<LoadingIndicator size='LoaderLarge' />
						) : (
							<Button
								cssForButton={deleteAccountBtnClasses}
								value='Delete'
								clicked={e => deleteAccountHandler(e)}
							/>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Profile;
