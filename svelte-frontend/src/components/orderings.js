import moment from 'moment';


export const ascendingAmounts = (x, y) => {
    const a = parseFloat(x.amount);
    const b = parseFloat(y.amount);

    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

export const descendingAmounts = (x, y) => {
    const a = parseFloat(x.amount);
    const b = parseFloat(y.amount);

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }
    return 0;
}

export const descendingCategories = (x, y) => {
    const a = x.category_name;
    const b = y.category_name;

    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

export const ascendingCategories = (x, y) => {
    const a = x.category_name;
    const b = y.category_name;

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }
    return 0;
}

export const ascendingDates = (x, y) => {
    const a = x.paid_at;
    const b = y.paid_at;

    if (moment(a).isBefore(moment(b))) {
        return -1;
    } else if (moment(a).isAfter(moment(b))) {
        return 1;
    }
    return 0;
}

export const descendingDates = (x, y) => {
    const a = x.paid_at;
    const b = y.paid_at;

    if (moment(a).isAfter(moment(b))) {
        return -1;
    } else if (moment(a).isBefore(moment(b))) {
        return 1;
    }
    return 0;
}
