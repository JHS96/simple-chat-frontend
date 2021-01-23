import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Logo from '../../components/Logo/Logo';
import AvatarElements from '../../components/FormElements/AvatarElements/AvatarElements';
import UsernameElements from '../../components/FormElements/UsernameElements/UsernameElements';
import EmailElements from '../../components/FormElements/EmailElements/EmailElements';
import PasswordElements from '../../components/FormElements/PasswordElement/PasswordElements';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
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

	const { sendRequest, isLoading, error } = useHttpClient();

	const Heading = () => {
		if (mode === 'log in') return <h1>Log In</h1>;
		else if (mode === 'sign up') return <h1>Sign Up</h1>;
		else if (mode === 'reset password') return <h1>Reset Password</h1>;
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
		} else if (mode === 'sign up' || mode === 'reset password') {
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
		} else if (mode === 'reset password') {
			return (
				<CustomLink
					cssForCustLnk={['Text-Bold', 'Text-Blue', 'Text-Small']}
					text='- or Log In -'
					clicked={() => setMode('log in')}
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
			// Set global state
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
			// Save info in localStorage
			localStorage.setItem('token', response.token);
			localStorage.setItem('jwtExpireTime', response.jwtExpireTime);
			localStorage.setItem(
				'data',
				JSON.stringify({
					id: response.data.userId,
					name: response.data.userName,
					email: response.data.email,
					avatarUrl: response.data.avatarUrl
				})
			);
			props.history.replace('/conversations');
		} catch (err) {
			console.log(err);
		}
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
					clicked={event => {
						event.preventDefault();
						console.log('sign up');
					}}
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
		}
	};

	if (error) console.log(error); // TODO display error modal
	if (isLoading) console.log('Loading...'); // TODO display loading spinner

	return (
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
					{mode !== 'reset password' && (
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
					<SubmitButton />
					{mode === 'log in' && (
						<CustomLink
							cssForCustLnk={['Text-Red', 'Text-Small']}
							text='Forgot your password?'
							clicked={() => setMode('reset password')}
						/>
					)}
				</div>
			</form>
		</div>
	);
};

export default Auth;
