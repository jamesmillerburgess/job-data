const getIsAgilityConsolHouse = (jobs, i) => {
  if (jobs[i].isCONTROLMaster) {
    return false;
  }
  const master = jobs.find(
    job =>
      job.isCONTROLMaster &&
      !job.isCustomerConsol &&
      job.carrierReference === jobs[i].carrierReference
  );
  return !!master;
};

const labelAgilityConsolHouses = jobs =>
  jobs.map((job, i) =>
    Object.assign({}, job, {
      isAgilityConsolHouse: getIsAgilityConsolHouse(jobs, i),
    })
  );
