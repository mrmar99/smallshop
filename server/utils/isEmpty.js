const isEmpty = (value) => {
    return (value === undefined || value === null || !value.trim());
}

export default isEmpty;