const classificationMovie = (classification) => {
    switch (classification) {
        case 'L':
            return 'rating-L';
        case '10':
            return 'rating-10';
        case '12':
            return 'rating-12';
        case '14':
            return 'rating-14';
        case '16':
            return 'rating-16';
        case '18':
            return 'rating-18';
        default:
            return '';
    }
}

export default classificationMovie;