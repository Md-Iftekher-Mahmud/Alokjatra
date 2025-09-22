
let lastScrollTop = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.classList.add("hide");} else {
    header.classList.remove("hide");}
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;});


  function loadJobs(jsonPath, containerId, paginationId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(jobs => {
      let currentPage = 1;
      const jobsPerPage = 12;
      const container = document.getElementById(containerId);
      const pagination = document.getElementById(paginationId);
      const prevBtn = pagination.querySelector("#prev");
      const nextBtn = pagination.querySelector("#next");
      const pageInfo = pagination.querySelector("#page-info");

      function renderPage(page) {
        container.innerHTML = "";
        const start = (page - 1) * jobsPerPage;
        const end = start + jobsPerPage;
        const pageJobs = jobs.slice(start, end);

        pageJobs.forEach(job => {
          const div = document.createElement("div");
          div.classList.add("job-card");
          div.innerHTML = `
          <h2>${job.title}</h2>
            <p><strong>${job.company}</strong> — ${job.location}</p>
            <small>তারিখ: ${job.date}</small>
            <a style="text-align: center;" href="${job.link}">বিস্তারিত দেখুন</a>
          `;
          container.appendChild(div);
        });

        prevBtn.disabled = page === 1;
        nextBtn.disabled = end >= jobs.length;
        pageInfo.textContent = `পৃষ্ঠা ${page} / ${Math.ceil(jobs.length / jobsPerPage)}`;
      }

      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      });
      nextBtn.addEventListener("click", () => {
        if (currentPage * jobsPerPage < jobs.length) {
          currentPage++;
          renderPage(currentPage);
        }
      });

      renderPage(currentPage);
    })
    .catch(err => console.error("Error loading jobs:", err));
}// === Index Page এর জন্য সর্বশেষ ১টা জব লোড ===
function loadLatestJob(jsonPath, containerId) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(jobs => {
      if (jobs.length > 0) {
        const latestJob = jobs[0]; // json এর প্রথম জবকেই সর্বশেষ ধরা হচ্ছে
        const container = document.getElementById(containerId);

        const div = document.createElement("div");
        div.classList.add("job-card");
        div.innerHTML = `
          <h4 style="margin:10px 0 6px">${latestJob.title}</h4>
          <p style="color: #475569;"><strong>${latestJob.company}</strong> — ${latestJob.location}</p>
          <small style="display: flex;gap: 10px;flex-wrap: wrap;margin-top: 8px;">তারিখ: ${latestJob.date}</small>
          <a style="text-align: center;" href="${latestJob.link} ">বিস্তারিত দেখুন</a>
        `;
        container.appendChild(div);
      }
    })
    .catch(err => console.error("Error loading latest job:", err));
}