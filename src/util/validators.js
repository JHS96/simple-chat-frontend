import isEmail from 'validator/es/lib/isEmail'; // Tree-shakeable import

export const isValidString = (str, minLng, maxLng) => {
	if (
		str.trim().length < minLng ||
		str.trim().length > maxLng ||
		!isValidCharacters(str)
	) {
		return false;
	}
	return true;
};

export const isValidEmail = value => {
	if (!isEmail(value)) {
		return false;
	}
	return true;
};

export const isValidCharacters = value => {
	const regex = new RegExp(/^[\w\-\s]+$/i);
	return regex.test(value);
};

export const isValidLength = (value, minLng, maxLng) => {
	if (value.trim().length >= minLng && value.trim().length <= maxLng) {
		return true;
	}
	return false;
};

export const isMinLength = (value, minLng) => {
	if (value.trim().length < minLng) {
		return false;
	}
	return true;
};

export const maxLengthExceeded = (value, maxLng) => {
	if (value.trim().length > maxLng) {
		return true;
	}
	return false;
};

export const isValidImg = (maxSize, fileSize, fileType) => {
	if (
		fileSize <= maxSize &&
		(fileType === 'image/png' ||
			fileType === 'image/jpg' ||
			fileType === 'image/jpeg')
	) {
		return true;
	} else return false;
};

export const isFormValid = (
	mode,
	avatarImgValid,
	userName,
	nameMinLng,
	nameMaxLng,
	email,
	password,
	pwMinLng,
	pwMaxLng
) => {
	if (mode === 'log in') {
		if (isValidEmail(email) && isValidLength(password, pwMinLng, pwMaxLng)) {
			return true;
		}
	}
	if (mode === 'sign up') {
		if (
			avatarImgValid &&
			isValidString(userName, nameMinLng, nameMaxLng) &&
			isValidEmail(email) &&
			isValidLength(password, pwMinLng, pwMaxLng)
		) {
			return true;
		}
	}
	if (mode === 'reset password') {
		if (isValidEmail(email)) {
			return true;
		}
	}
	if (mode === 'resend email') {
		if (isValidEmail(email)) {
			return true;
		}
	}
	return false;
};
