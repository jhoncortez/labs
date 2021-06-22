import {getJobs} from "./dataFunctions.js";
import {buildItemsJobs} from "./jobsItems.js";

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {

    // load items
    processLoadJobs();

};

const processLoadJobs = async () => {

    const dataJobs = await getJobs();

    if (dataJobs === "") return;

    buildItemsJobs(dataJobs); 

}