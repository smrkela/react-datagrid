const comparator = (value1, value2, column) => {

    let result = 0;

    if (value1 === null)
        return -1;

    if (value2 === null)
        return 1;

    if (value1 === undefined)
        return -1;

    if (value2 === undefined)
        return 1;

    if (!isNaN(value1) && !isNaN(value2)) {
        result = value1 - value2;
    }
    else if (typeof value1 === "string" && typeof value2 === "string") {
        result = value1.localeCompare(value2);
    }

    return result;
}

export default comparator;