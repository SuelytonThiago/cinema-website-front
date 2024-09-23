const isValidContactNumber = (contactNumber) => {
    const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;

    if (!contactNumber) return false;
    if (!phoneRegex.test(contactNumber)) return false;

    return true;
}

export default isValidContactNumber;