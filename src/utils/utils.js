export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export function convertToKorean(mode) {
    switch (mode) {
        case 'artists':
            return '아티스트';
        case 'albums':
            return '앨범';
        case 'tracks':
            return '트랙';
        default:
            return null;
    }
};