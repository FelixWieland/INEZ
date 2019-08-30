
export const ddmmyyyy = () => {
    const dt = new Date()
    const mm = dt.getMonth() + 1 // getMonth() is zero-based
    const dd = dt.getDate()
    return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        dt.getFullYear(),
    ].join('.')
}
