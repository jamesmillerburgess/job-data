const getIsEmptyConsol = job =>
  job.isCONTROLMaster && !job.isAgilityConsol && !job.isCustomerConsol;

const labelEmptyConsols = jobs =>
  jobs.map(job =>
    Object.assign({}, job, { isEmptyConsol: getIsEmptyConsol(job) })
  );
