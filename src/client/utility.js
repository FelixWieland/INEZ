
export const ddmmyyyy = () => {
    let dt = new Date()
    let mm = dt.getMonth() + 1; // getMonth() is zero-based
    let dd = dt.getDate();
    return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        dt.getFullYear()
    ].join('.');
};