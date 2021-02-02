import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Logo from '../../components/Logo/Logo';
import AvatarElements from '../../components/FormElements/AvatarElements/AvatarElements';
import UsernameElements from '../../components/FormElements/UsernameElements/UsernameElements';
import EmailElements from '../../components/FormElements/EmailElements/EmailElements';
import PasswordElements from '../../components/FormElements/PasswordElement/PasswordElements';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import { isFormValid } from '../../util/validators';
import { useHttpClient } from '../../custom_hooks/http-hook';
import allActions from '../../redux/actions';
import styles from './Auth.module.css';

const Auth = props => {
	const dispatch = useDispatch();

	const [mode, setMode] = useState('log in');

	const [avatarImg, setAvatarImg] = useState();
	const [isAvatarImgValid, setIsAvatarImgValid] = useState(true); // Initialize as true to prevent inputError class from being added to input on initial page load

	const [userName, setUserName] = useState('');
	const [isUserNameValid, setIsUserNameValid] = useState('not set'); // Initialize as 'not set' - which is truthy but not explicitly 'true' - to prevent inputError class from being added to input on initial page load
	const userNameMinLength = 3;
	const userNameMaxLength = 15;

	const [email, setEmail] = useState('');
	const [isEmailValid, setIsEmailValid] = useState('not set'); // Initialize as 'not set' - which is truthy but not explicitly 'true' - to prevent inputError class from being added to input on initial page load

	const [password, setPassword] = useState('');
	const [isPasswordAcceptableLength, setIsPasswordAcceptableLength] = useState(
		'not set'
	); // Initialize as 'not set' - which is truthy but not explicitly 'true' - to prevent inputError class from being added to input on initial page load
	const passwordMinLength = 6;
	const passwordMaxLength = 32;

	const [serverResMsg, setServerResMsg] = useState();

	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	const Heading = () => {
		if (mode === 'log in') return <h1>Log In</h1>;
		else if (mode === 'sign up') return <h1>Sign Up</h1>;
		else if (mode === 'reset password') return <h1>Reset Password</h1>;
		else if (mode === 'resend email') return <h1>Resend Confirmation Email</h1>;
	};

	const ModeSelector = () => {
		if (mode === 'log in') {
			return (
				<CustomLink
					cssForCustLnk={['Text-Bold', 'Text-Blue', 'Text-Small']}
					text='- or Sign Up -'
					clicked={() => setMode('sign up')}
				/>
			);
		} else if (
			mode === 'sign up' ||
			mode === 'reset password' ||
			mode === 'resend email'
		) {
			return (
				<CustomLink
					cssForCustLnk={['Text-Bold', 'Text-Blue', 'Text-Small']}
					text='- or Log In -'
					clicked={() => {
						setMode('log in');
						setAvatarImg(undefined);
					}}
				/>
			);
		}
	};

	// Activates/decactivates submit button based on entire form's validity
	const ButtonActive = () => {
		return isFormValid(
			mode,
			isAvatarImgValid,
			userName,
			userNameMinLength,
			userNameMaxLength,
			email,
			password,
			passwordMinLength,
			passwordMaxLength
		);
	};

	const loginHandler = async event => {
		const body = JSON.stringify({ email: email, password: password });
		event.preventDefault();
		try {
			const response = await sendRequest(
				'http://localhost:8080/auth/login',
				'POST',
				body,
				{ 'Content-Type': 'application/json' }
			);
			dispatch(
				allActions.userActions.loginStart(
					response.token,
					response.jwtExpireTime,
					response.data.userId,
					response.data.userName,
					response.data.email,
					response.data.avatarUrl
				)
			);
			props.history.replace('/conversations');
		} catch (err) {
			console.log(err);
		}
	};

	const signupHandler = async event => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('avatar', avatarImg);
		formData.append('name', userName);
		formData.append('email', email);
		formData.append('password', password);

		try {
			const response = await sendRequest(
				'http://localhost:8080/auth/signup',
				'POST',
				formData
			);
			setServerResMsg(response.message);
		} catch (err) {
			console.log(err);
		}
	};

	const resendConfEmailHandler = async event => {
		const body = JSON.stringify({ email: email });
		try {
			const response = await sendRequest(
				'http://localhost:8080/account/resend-confirmation-email',
				'POST',
				body,
				{ 'Content-Type': 'application/json' }
			);
			setServerResMsg(response.message);
		} catch (err) {
			console.log(err);
		}
	};

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

	const SubmitButton = () => {
		if (mode === 'log in') {
			return (
				<Button
					cssForButton={
						ButtonActive()
							? ['Btn-Default', 'Btn-Large']
							: ['Btn-Disabled', 'Btn-Large']
					}
					value='Log In'
					clicked={event => loginHandler(event)}
				/>
			);
		} else if (mode === 'sign up') {
			return (
				<Button
					cssForButton={
						ButtonActive()
							? ['Btn-Default', 'Btn-Large']
							: ['Btn-Disabled', 'Btn-Large']
					}
					value='Sign Up'
					clicked={event => signupHandler(event)}
				/>
			);
		} else if (mode === 'reset password') {
			return (
				<Button
					cssForButton={
						ButtonActive()
							? ['Btn-Danger', 'Btn-Large']
							: ['Btn-Disabled', 'Btn-Large']
					}
					value='Reset'
					clicked={event => {
						event.preventDefault();
						console.log('reset');
					}}
				/>
			);
		} else if (mode === 'resend email') {
			return (
				<Button
					cssForButton={
						ButtonActive()
							? ['Btn-Default', 'Btn-Large']
							: ['Btn-Disabled', 'Btn-Large']
					}
					value='Send Email'
					clicked={event => resendConfEmailHandler(event)}
				/>
			);
		}
	};

	return (
		<React.Fragment>
			<ModalEl />
			<div className={styles.Container}>
				<form className={styles.SignupForm}>
					<div className={styles.FormElements}>
						<div className={styles.LogoContainer}>
							<Logo />
						</div>
						<hr />
						<Heading />
						<ModeSelector />
						<hr />
						{mode === 'sign up' && (
							<React.Fragment>
								<AvatarElements
									imgValid={isAvatarImgValid}
									avatarImg={avatarImg}
									setAvImg={setAvatarImg}
									setAvImgValid={setIsAvatarImgValid}
								/>
								<UsernameElements
									setName={setUserName}
									setNameValid={setIsUserNameValid}
									nameMinLng={userNameMinLength}
									nameMaxLng={userNameMaxLength}
									nameValid={isUserNameValid}
									name={userName}
								/>
							</React.Fragment>
						)}
						<EmailElements
							setMail={setEmail}
							setMailValid={setIsEmailValid}
							mailIsValid={isEmailValid}
							val={email}
						/>
						{mode !== 'reset password' && mode !== 'resend email' && (
							<PasswordElements
								setPw={setPassword}
								setPwAcceptableLng={setIsPasswordAcceptableLength}
								acceptableLng={isPasswordAcceptableLength}
								pwMinLng={passwordMinLength}
								pwMaxLng={passwordMaxLength}
								val={password}
								mode={mode}
								clicked={() => setMode('reset password')}
							/>
						)}
						{isLoading ? (
							<LoadingIndicator size='LoaderLarge' />
						) : (
							<SubmitButton />
						)}
						{mode === 'log in' && (
							<CustomLink
								cssForCustLnk={['Text-Blue', 'Text-Small', 'Text-Bold']}
								text='Forgot your password?'
								clicked={() => setMode('reset password')}
							/>
						)}
						{mode === 'sign up' && (
							<CustomLink
								cssForCustLnk={['Text-Blue', 'Text-Small', 'Text-Bold']}
								text='Resend confirmation email...'
								clicked={() => setMode('resend email')}
							/>
						)}
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};

export default Auth;
