const getHouseIndices = (jobs, master) => {
  const houseIndices = [];
  jobs.forEach((job, i) => {
    if (
      job.carrierReference === master.carrierReference &&
      job.consignmentId !== master.consignmentId
    ) {
      houseIndices.push(i);
    }
  });
  return houseIndices;
};
// jobs
//   .filter(
//     job =>
//       job.carrierReference === master.carrierReference &&
//       job.consignmentId !== master.consignmentId
//   )
//   .map(job => job.consignmentId);

const addHouses = jobs =>
  jobs.map(job => {
    job.houses = [];
    if (!job.isCONTROLMaster) {
      return job;
    }
    const houses = getHouseIndices(jobs, job);
    return Object.assign({}, job, { houses });
  });
