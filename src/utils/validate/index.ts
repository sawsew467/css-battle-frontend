import { EXCEPTION_MESSAGES } from './../message/index';

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateInput = (email?: string, password?: string, emailRef?: any, pwRef?: any) => {
    let valid = true;
    const messages: string[] = [];

    if (email && email.match(emailRegex)) {
        emailRef.current.classList.remove('invalid');
    } else {
        emailRef.current.classList.add('invalid');
        valid = false;
        messages.push(EXCEPTION_MESSAGES.INVALID_EMAIL);
    }
    if (!password || password.length < 6 || password.length > 16) {
        pwRef.current.classList.add('invalid');
        valid = false;
        messages.push(EXCEPTION_MESSAGES.INVALID_PASSWORD);
    } else {
        pwRef.current.classList.remove('invalid');
    }
    return {
        valid,
        messages,
    };
};

export const validateInputEmail = (email?: string, emailRef?: any) => {
    if (email && email.match(emailRegex)) {
        emailRef.current.classList.remove('invalid');
    } else {
        emailRef.current.classList.add('invalid');
        return {
            valid: false,
            message: EXCEPTION_MESSAGES.INVALID_EMAIL,
        };
    }
    return {
        valid: true,
    };
};
