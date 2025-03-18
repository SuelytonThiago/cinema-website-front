export const validateCategoryName = (name) => {
    const nameRegex = /[A-Za-z].*[A-Za-z].*[A-Za-z]/
    return !!name && nameRegex.test(name);
}