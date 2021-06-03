let range = (function () {
    const getDatesBetweenDays = (startDate, endDate) => {
        let dates = []
        const theDate = new Date(startDate)
        while (theDate < endDate) {
            dates = [...dates, new Date(theDate)]
            theDate.setDate(theDate.getDate() + 1)
        }
        dates = [...dates, endDate]
        return dates
    }
    const getMonthsBetweenDays = (startDate, endDate) => {
        let dates = []
        startDate = startDate.setDate(1);
        const theDate = new Date(startDate)
        while (theDate < endDate) {
            dates = [...dates, new Date(theDate)]
            theDate.setMonth(theDate.getMonth() + 1)
        }
        dates = [...dates]
        return dates
    }
    let getRemainingDates = function (date) {
        const endDate = new Date()
        const startDate = new Date(date)
        return getDatesBetweenDays(startDate, endDate);
    }
    let getDates = function (days) {
        const endDate = new Date()
        const startDate = new Date(endDate)
        startDate.setDate(startDate.getDate() - days)
        return getDatesBetweenDays(startDate, endDate);
    }
    let getMonths = function (maxNumberOfMonths) {
        const endDate = new Date()
        const startDate = new Date(endDate)
        startDate.setMonth(startDate.getMonth() - maxNumberOfMonths)
        return getMonthsBetweenDays(startDate, endDate);
    }

    return {
        getRemainingDates: getRemainingDates,
        getDates: getDates,
        getMonths: getMonths
    };
})();
module.exports = range;