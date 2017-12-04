// const rawJobs = db.rawJobs.find({}).toArray();
// If JBCARF, then jobs are linked to same master
load('constants.js');

const getIsCONTROLMaster = job => job.Textbox30.slice(0, 5) === 'ZZZZZ';

const hasSameConsignmentId = (job1, job2) =>
  job1.consignmentId === job2.consignmentId;
const hasSameJobNumber = (job1, job2) => job1.JBJOB === job2.JBJOB;

const translate = job => ({
  numCONTROLJobs: 1,
  consignmentId: job['HAWB'],
  product: MODES[job.Mode],
  countries: [
    COMPANIES.find(company => company.companyCode === job['Company Code'])
      .country,
  ],
  originOffice: job['Export/Import'] === 1 ? job.Branch : undefined,
  destinationOffice: job['Export/Import'] === 2 ? job.Branch : undefined,
  originCountry: job['Origin Country'],
  destinationCountry: job['Destination Country'],
  shipper: job['Shipper Client ID'],
  consignee: job['Consignee Client ID'],
  hierarchies: job['Customer Hierarchy Tree']
    ? [job['Customer Hierarchy Tree']]
    : [],
  carrierReference: job['Carrier Reference (MAWB)'],
  serviceType: SERVICE_TYPES[job['Service Type']],
  serviceLevel: SERVICE_LEVELS[job['Service Levels']],
  isCONTROLMaster: job['Consol Master Flag'] === 1,
  isDomestic: job['Export/Import'] === 3,
  isProjectLogistics:
    COMPANIES.find(company => company.companyCode === job['Company Code'])
      .projects === 1,
  isChemicals:
    COMPANIES.find(company => company.companyCode === job['Company Code'])
      .chemicals === 1,
});

const combineJobs = rawJobs => {
  const combinedJobs = [];
  rawJobs.forEach((rawJob, i) => {
    if (i > 0 && i % 1000 === 0) {
      printjson(
        `${i} raw jobs combined into ${combinedJobs.length} combined jobs...`
      );
    }
    const translatedJob = translate(rawJob);
    const match = combinedJobs.findIndex(combinedJob =>
      hasSameConsignmentId(combinedJob, translatedJob)
    );
    if (match !== -1) {
      combinedJobs[match].numCONTROLJobs++;
      rawJob['Customer Hierarchy Tree'] &&
        combinedJobs[match].hierarchies.push(rawJob['Customer Hierarchy Tree']);
      rawJob['Export/Import'] === 1 &&
        (combinedJobs[match].originOffice = rawJob.Branch);
      rawJob['Export/Import'] === 2 &&
        (combinedJobs[match].destinationOffice = rawJob.Branch);
      const country = COMPANIES.find(
        company => company.companyCode === rawJob['Company Code']
      ).country;
      combinedJobs[match].countries.indexOf(country) === -1 &&
        combinedJobs[match].countries.push(country);
      combinedJobs[match].isProjectLogistics =
        combinedJobs[match].isProjectLogistics ||
        COMPANIES.find(
          company => company.companyCode === rawJob['Company Code']
        ).projects === 1;
      combinedJobs[match].isChemicals =
        combinedJobs[match].isChemicals ||
        COMPANIES.find(
          company => company.companyCode === rawJob['Company Code']
        ).chemicals === 1;
    } else {
      combinedJobs.push(translatedJob);
    }
  });
  return combinedJobs;
};

// const getIsCONTROLHouse = (jobs, i) => {
//   if (!jobs[i].carrierReference || jobs[i].isCONTROLConsol) {
//     return false;
//   }
//   const master = jobs.find(
//     job =>
//       job.isCONTROLConsol && job.carrierReference === jobs[i].carrierReference
//   );
//   if (master) {
//     master.controlHouses.push(jobs[i].consignmentId);
//     jobs[i].master = master.consignmentId;
//   }
//   return !!master;
// };
// const isDirectJob = (jobs, i) =>
//   !jobs[i].isCONTROLConsol &&
//   !jobs[i].isPartOfCustomerConsol &&
//   jobs[i].numCONTROLJobs === 1;
// const isB2BJob = (jobs, i) =>
//   !jobs[i].isCONTROLConsol &&
//   !jobs[i].isPartOfCustomerConsol &&
//   !jobs[i].isHouse &&
//   !jobs[i].isDirect;
// const isAirJob = (jobs, i) =>
//   !jobs[i].isPartOfCustomerConsol && jobs[i].mode === 'Air';
// const isOceanJob = (jobs, i) =>
//   !jobs[i].isPartOfCustomerConsol && jobs[i].mode === 'Ocean';
// const isMultiModalJob = (jobs, i) =>
//   !jobs[i].isPartOfCustomerConsol && !jobs[i].mode === 'Multi-Modal';
// const getIsCustomerConsol = (jobs, i) => {
//   if (!jobs[i].isCONTROLConsol) {
//     return false;
//   }
//   const master = jobs[i];
//   const houses = jobs.filter(
//     job => master.controlHouses.indexOf(job.consignmentId) !== -1
//   );
//   if (houses.length === 0) {
//     return false;
//   }
//   const buyer = houses[0].jobs[0].JBCGEE;
//   const seller = houses[0].jobs[0].JBSHPR1;
//   const isBuyersConsol = houses.reduce(
//     (prev, house) => prev && house.jobs[0].JBCGEE === buyer,
//     true
//   );
//   const isSellersConsol = houses.reduce(
//     (prev, house) => prev && house.jobs[0].JBSHPR1 === seller,
//     true
//   );
//   return isBuyersConsol || isSellersConsol;
// };
// const getIsAgilityConsol = (jobs, i) =>
//   jobs[i].isCONTROLConsol &&
//   !jobs[i].isCustomerConsol &&
//   jobs[i].controlHouses.length > 0;
// const getIsPartOfCustomerConsol = (jobs, i) => {
//   if (!jobs[i].isCONTROLHouse || !jobs[i].master) {
//     return false;
//   }
//   const master = jobs.find(job => job.consignmentId === jobs[i].master);
//   if (!master) {
//     return false;
//   }
//   return master.isCustomerConsol;
// };
// const getIsHouse = (jobs, i) =>
//   !jobs[i].isCONTROLConsol && !jobs[i].isPartOfCustomerConsol;
// const getIsCourierJob = (jobs, i) => jobs[i].mode === 'Courier';
// const getIsFOCiSJobOrConsol = (jobs, i) => {
//   const job = jobs[i];
//   if (job.isPartOfCustomerConsol) {
//     return false;
//   }
//   if (job.isCONTROLConsol && !job.isAgilityConsol && !job.isCustomerConsol) {
//     return false;
//   }
//   return true;
// };

// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isCONTROLHouse = getIsCONTROLHouse(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isCustomerConsol = getIsCustomerConsol(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isAgilityConsol = getIsAgilityConsol(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isPartOfCustomerConsol = getIsPartOfCustomerConsol(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isFOCiSJobOrConsol = getIsFOCiSJobOrConsol(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isHouse = getIsHouse(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isDirect = isDirectJob(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isB2B = isB2BJob(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isAir = isAirJob(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isOcean = isOceanJob(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isCourier = getIsCourierJob(groupedJobs, i);
// });
// groupedJobs.forEach((groupedJob, i) => {
//   groupedJob.isMultiModal = isMultiModalJob(groupedJobs, i);
// });

// printjson(`Jobs  : ${rawJobs.length}`);
// printjson(`Groups: ${groupedJobs.length}`);

// const PROPERTIES = [
//   'isCustomerConsol',
//   'isPartOfCustomerConsol',
//   'isAgilityConsol',
//   'isHouse',
//   'isDirect',
//   'isB2B',
//   'isAir',
//   'isOcean',
//   'isCourier',
//   'isMultiModal',
// ];

// const getPropertyCounts = () =>
//   groupedJobs.reduce((prev, group) => {
//     const next = prev;

//     PROPERTIES.forEach(prop => {
//       if (!next[prop]) {
//         next[prop] = 0;
//       }
//       if (group[prop]) {
//         next[prop] += 1;
//       }
//     });
//     return next;
//   }, {});

// printjson(getPropertyCounts());
// db.focisJobs.remove({});
// db.focisJobs.insertMany(groupedJobs);
