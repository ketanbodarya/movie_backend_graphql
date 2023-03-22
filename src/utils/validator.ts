import respondWith from "./respondWith";

const emailRegEx = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const checkEmailValidation = (email: String) => {
    const isMatched: RegExpMatchArray = email.match(new RegExp(emailRegEx));

    if (!isMatched) {
        respondWith('Please enter valid email address', 400);
    }
}

export const checkPasswordValidation = (password: String) => {
    const isMatched: RegExpMatchArray = password.match(new RegExp(passwordRegEx));

    if (!isMatched) {
        respondWith('Password must contain minimum 8 character with atleast one uppercase, special character and number', 400);
    }
}