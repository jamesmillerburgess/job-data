const getIsCrossTrade = job => job.numCONTROLJobs > 2;

const labelCrossTrade = jobs =>
  jobs.map(job =>
    Object.assign({}, job, {
      isCrossTrade: getIsCrossTrade(job),
    })
  );
