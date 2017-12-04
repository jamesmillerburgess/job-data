const getIsCustomerConsolHouse = (jobs, i) => {
  if (jobs[i].isCONTROLMaster) {
    return false;
  }
  const master = jobs.find(
    job =>
      job.isCustomerConsol && job.carrierReference === jobs[i].carrierReference
  );
  return !!master;
};

const labelCustomerConsolHouses = jobs =>
  jobs.map((job, i) =>
    Object.assign({}, job, {
      isCustomerConsolHouse: getIsCustomerConsolHouse(jobs, i),
    })
  );
