const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) return false;
    if (!passwordRegex.test(password)) return false;

    return true;
}

export default isValidPassword;