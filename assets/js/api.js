export async function fetchData(url, successCallback, errorCallback) {
    const response = await fetch(url);

    if(response.ok) {
        const data = await response.json();
        successCallback(data);
        return;
    } else {
        const error = await response.json();
        errorCallback && errorCallback(error);
    }
}