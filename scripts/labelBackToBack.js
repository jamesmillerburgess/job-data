const getIsBackToBack = job =>
  !job.isCONTROLMaster &&
  !job.isAgilityConsolHouse &&
  !job.isCustomerConsolHouse &&
  !!job.originOffice &&
  !!job.destinationOffice;

const labelBackToBack = jobs =>
  jobs.map(job =>
    Object.assign({}, job, {
      isBackToBack: getIsBackToBack(job),
    })
  );
