const getIsCustomerConsol = (jobs, i) => {
  if (!jobs[i].isCONTROLMaster) {
    return false;
  }
  const houses = jobs[i].houses.map(j => jobs[j]);
  if (houses.length === 0) {
    return false;
  }
  const buyer = houses[0].consignee;
  const seller = houses[0].shipper;
  const isBuyersConsol = houses.reduce(
    (prev, house) => prev && house.consignee === buyer,
    true
  );
  const isSellersConsol = houses.reduce(
    (prev, house) => prev && house.shipper === seller,
    true
  );
  return isBuyersConsol || isSellersConsol;
};

const labelCustomerConsols = function(jobs) {
  return jobs.map((job, i) =>
    Object.assign({}, job, { isCustomerConsol: getIsCustomerConsol(jobs, i) })
  );
};
