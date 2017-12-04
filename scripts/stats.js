const getStats = jobs => {
  const incrementProperties = (prev, job) => {
    return Object.keys(start).reduce(
      (keyPrev, key) =>
        Object.assign(keyPrev, {
          [key]: prev[key] + (job[key] ? 1 : 0),
        }),
      {}
    );
  };

  const start = {
    isAgilityConsol: 0,
    isAgilityConsolHouse: 0,
    isCustomerConsol: 0,
    isCustomerConsolHouse: 0,
    isEmptyConsol: 0,
    isBackToBack: 0,
    isDirect: 0,
    isCrossTrade: 0,
    isNoTransport: 0,
    isRoad: 0,
    isAir: 0,
    isOcean: 0,
    isRail: 0,
    isCourier: 0,
    isMultiModal: 0,
    isBrokerage: 0,
    isProjectLogistics: 0,
    isChemicals: 0,
  };
  return jobs.reduce(incrementProperties, start);
};
