const isValidName = (name) =>{
        const nameRegex = /.*[A-Za-z].*[A-Za-z].*[A-Za-z].*/

        if(!name) return false;
        if(!nameRegex.test(name)) return false;

        return true;
}

export default isValidName;