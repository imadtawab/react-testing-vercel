export const filterQuerysHandler = async (object, dispatchFunc, step = null,) => {
    const queryParams = await queryObjectHandler()
    // Add pagination params if they exist
    if (step || queryParams.step) {
        queryParams.page = 1;
        queryParams.step = step;
    }
    
    // Add filter parameters
    await Object.keys(object).forEach(key => {
        queryParams[key] = object[key];
    });
    let finalyQueryParams = {}
    await Object.keys(queryParams).forEach(key => {
        if(queryParams[key]) finalyQueryParams[key] = queryParams[key];
    });
    // Update URL based on query params
    const queryString = new URLSearchParams(finalyQueryParams);
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, null, newUrl);  // use navigate instead of history.push
    // Dispatch action
    dispatchFunc();
};

export const queryObjectHandler = () => {
    let queryString = window.location.search
    const params = new URLSearchParams(queryString);
    const result = {};
    // Iterate through all key-value pairs in the query string
    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}
