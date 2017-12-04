const getIsNoTransport = job => job.product === 'No Transport';
const getIsRoad = job => job.product === 'Road';
const getIsAir = job => job.product === 'Air';
const getIsOcean = job => job.product === 'Ocean';
const getIsRail = job => job.product === 'Rail';
const getIsCourier = job => job.product === 'Courier';
const getIsMultiModal = job => job.product === 'Multi-Modal';
const getIsBrokerage = job =>
  job.serviceType === 'Brokerage' && job.numCONTROLJobs === 1;

const labelProducts = jobs =>
  jobs.map((job, i) =>
    Object.assign({}, job, {
      isNoTransport: getIsNoTransport(job),
      isRoad: getIsRoad(job),
      isAir: getIsAir(job),
      isOcean: getIsOcean(job),
      isRail: getIsRail(job),
      isCourier: getIsCourier(job),
      isMultiModal: getIsMultiModal(job),
      isBrokerage: getIsBrokerage(job),
    })
  );
