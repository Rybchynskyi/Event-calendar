module.exports = function correctDate(date, time) {
    let date_mm_dd = date.split("-");
    let mm = () => {
        if (+date_mm_dd[0] < 10) return '0' + date_mm_dd[0];
        return date_mm_dd[0];
    };
    let dd = () => {
        if (+date_mm_dd[1] < 10) return '0' + date_mm_dd[1];
        return date_mm_dd[1];
    };
    let now = new Date();
    let result = now.getFullYear() + "-" + mm() + "-" + dd() + " " + time + ":00";
    return result;
}