import React, { useState } from 'react';

import Logo from '../../components/Logo/Logo';
import SignUpElements from '../../components/FormElements/SignUpElements/SignUpElements';
import EmailElements from '../../components/FormElements/EmailElements/EmailElements';
import PasswordElements from '../../components/FormElements/PasswordElement/PasswordElements';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';

import styles from './Auth.module.css';

const Signup = () => {
	const [mode, setMode] = useState('log in');

	const [avatarImg, setAvatarImg] = useState();
	const [isAvatarImgValid, setIsAvatarImgValid] = useState(true); // Initialize as true to prevent inputError class from being added to input on initial page load

	const [userName, setUserName] = useState('');
	const [isUserNameValid, setIsUserNameValid] = useState(true); // Initialize as true to prevent inputError class from being added to input on initial page load

	const [email, setEmail] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true); // Initialize as true to prevent inputError class from being added to input on initial page load

	const [password, setPassword] = useState('');
	const [isPasswordAcceptableLength, setIsPasswordAcceptableLength] = useState(
		true
	); // Initialize as true to prevent inputError class from being added to input on initial page load

	const Heading = () => {
		if (mode === 'log in') return <h1>Log In</h1>;
		else if (mode === 'sign up') return <h1>Sign Up</h1>;
		else if (mode === 'reset password') return <h1>Reset Password</h1>;
	};

	const ModeSelector = () => {
		if (mode === 'log in') {
			return (
				<CustomLink text='- or Sign Up -' clicked={() => setMode('sign up')} />
			);
		} else if (mode === 'sign up' || mode === 'reset password') {
			return (
				<CustomLink text='- or Log In -' clicked={() => setMode('log in')} />
			);
		} else if (mode === 'reset password') {
			return (
				<CustomLink text='- or Log In -' clicked={() => setMode('log in')} />
			);
		}
	};

	const SubmitButton = () => {
		if (mode === 'log in') {
			return (
				<Button
					btnClass='btnHighlight btnLarge'
					value='Log In'
					clicked={event => {
						event.preventDefault();
						console.log('log in');
					}}
				/>
			);
		} else if (mode === 'sign up') {
			return (
				<Button
					btnClass='btnHighlight btnLarge'
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
					btnClass='btnDanger btnLarge'
					value='Reset'
					clicked={event => {
						event.preventDefault();
						console.log('reset');
					}}
				/>
			);
		}
	};

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
						<SignUpElements
							imgValid={isAvatarImgValid}
							avatarImg={avatarImg}
							setAvImg={setAvatarImg}
							setAvImgValid={setIsAvatarImgValid}
							setName={setUserName}
							setNameValid={setIsUserNameValid}
							nameValid={isUserNameValid}
							name={userName}
						/>
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
							val={password}
							mode={mode}
							clicked={() => setMode('reset password')}
						/>
					)}
					<SubmitButton />
				</div>
			</form>
		</div>
	);
};

export default Signup;
