export const getJobs = async () => {
    const dataJobs = await requestData();
    return dataJobs;
}

const requestData = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}