const getIsAgilityConsol = job =>
  job.isCONTROLMaster && job.houses.length > 0 && !job.isCustomerConsol;

const labelAgilityConsols = jobs =>
  jobs.map(job =>
    Object.assign({}, job, { isAgilityConsol: getIsAgilityConsol(job) })
  );
