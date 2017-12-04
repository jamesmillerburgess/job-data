const getIsDirect = job =>
  !job.isCONTROLMaster &&
  !job.isAgilityConsolHouse &&
  !job.isCustomerConsolHouse &&
  (!job.originOffice || !job.destinationOffice);

const labelDirect = jobs =>
  jobs.map(job =>
    Object.assign({}, job, {
      isDirect: getIsDirect(job),
    })
  );
