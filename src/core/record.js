const ViewModel = require('../model/cache/ViewModel');
let record = (function () {
    let checkDailyRecord = function (views, date) {
        for (const view of views) {
            if (date.getFullYear() === view.timestamp.getFullYear() &&
                date.getMonth() === view.timestamp.getMonth() &&
                date.getDate() === view.timestamp.getDate()) {
                return view;
            }
        }
        let emptyView = {timestamp: date, count: 0, uniques: 0};
        return new ViewModel(emptyView);
    }
    let createDailyRecord = function (date, records) {
        for (const record of records.views) {
            if (date.getFullYear() === record.timestamp.getFullYear() &&
                date.getMonth() === record.timestamp.getMonth() &&
                date.getDate() === record.timestamp.getDate()) {
                return record;
            }
        }
        let emptyView = {timestamp: date, count: 0, uniques: 0};
        return new ViewModel(emptyView);
    }
    let updateDailyRecord = function (view, traffic) {
        for (const record of traffic.views) {
            if (view.timestamp.getFullYear() === record.timestamp.getFullYear() &&
                view.timestamp.getMonth() === record.timestamp.getMonth() &&
                view.timestamp.getDate() === record.timestamp.getDate()) {
                if ((view.uniques !== record.uniques) || (view.count !== record.count)) {
                    return record;
                }
            }
        }
        return view;
    }
    let createMonthlyRecord = function (date, records) {
        let count = 0;
        let uniques = 0;
        for (const record of records.views) {
            if (date.getFullYear() === record.timestamp.getFullYear() &&
                date.getMonth() === record.timestamp.getMonth()) {
                count = count + record.count;
                uniques = uniques + record.uniques;
            }
        }
        let view = {timestamp: date, count: count, uniques: uniques};
        return new ViewModel(view);
    }
    let checkMonthlyRecord = function (date, views) {
        for (const view of views) {
            if (date.getFullYear() === view.timestamp.getFullYear() &&
                date.getMonth() === view.timestamp.getMonth()) {
                return view;
            }
        }
        let emptyView = {timestamp: date, count: 0, uniques: 0};
        return new ViewModel(emptyView);
    }
    let updateMonthlyRecord = function (date, records) {
        let count = 0;
        let uniques = 0;
        for (const record of records.views) {
            if (date.getFullYear() === record.timestamp.getFullYear() &&
                date.getMonth() === record.timestamp.getMonth()) {
                count = count + record.count;
                uniques = uniques + record.uniques;
            }
        }
        let view = {timestamp: date, count: count, uniques: uniques};
        return new ViewModel(view);
    }
    let checkMonthlyRecordUpdated = function (view, updates) {
        for (const update of updates) {
            if (view.timestamp.getFullYear() === update.timestamp.getFullYear() &&
                view.timestamp.getMonth() === update.timestamp.getMonth()) {
                if ((view.uniques !== update.uniques) || (view.count !== update.count)) {
                    return update;
                }
            }
        }
        return view;
    }
    return {
        checkDailyRecord: checkDailyRecord,
        createDailyRecord: createDailyRecord,
        updateDailyRecord: updateDailyRecord,
        checkMonthlyRecord: checkMonthlyRecord,
        createMonthlyRecord: createMonthlyRecord,
        updateMonthlyRecord: updateMonthlyRecord,
        checkMonthlyRecordUpdated: checkMonthlyRecordUpdated
    };
})();
module.exports = record;