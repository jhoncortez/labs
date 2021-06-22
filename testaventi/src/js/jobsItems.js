export const buildItemsJobs = (jobs) => {

    console.log(jobs);

    let tags = '';
    let jobsItem = '';

    jobs.forEach(job => {

        tags = getTags(job);
        
        jobsItem +=
        `
        <div class="list-item" id="job-${job.id}">
                        <div class="col col-image">
                            <img class="profile-img" src="${job.logo}" />
                        </div>
                        <div class="col col-details">
                            <div class="detail-item principal-tags">
                                <span class="company">${job.company}</span>
                                ${(job.new) ? `<span class="tag tag-new"> New! </span>` : ``}
                                ${(job.featured) ? `<span class="tag tag-featured">Featured!</span>` : ``}
                            </div>
                            <div class="detail-item position-detail">
                                <span class="position">${job.position}</span>
                            </div>
                            <div class="detail-item detail-metas">
                                <span class="postedAt">${job.postedAt}</span>
                                <span class="contract">${job.contract}</span>
                                <span class="location">${job.location}</span>
                            </div>
                            
                        </div>
                        <div class="col col-tags">
                            ${tags}
                        </div>
        </div>

        `;
    });
    const listJobs = document.querySelector('#list-jobs');
    //console.log(listJobs);
    //console.log(jobsItem);
    listJobs.innerHTML = jobsItem;
}

const getTags = (data) => {

    let tags = '';
    let lenguages = '';

    tags += `
        <a href="#" class="tag tag-role"><span class="text-link">${data.role}</span></a>
        <a href="#" class="tag tag-level"><span class="text-link">${data.level}</span></a>
    `;
    data['languages'].forEach(leng => {
        lenguages += `
        <a href="#" class="tag tag-language"><span class="text-link">${leng}</span></a>
        `;
    });
    tags += lenguages;
    return tags;
}