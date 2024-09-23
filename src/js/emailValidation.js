const isValidEmail = (email) => {
    const emailRegext = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!email) return false;
    if (!emailRegext.test(email)) return false;

    return true;
}

export default isValidEmail;