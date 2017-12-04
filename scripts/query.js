printjson('-------------------------------------------------------------');
printjson('Available Scenarios:');
printjson('isAgilityConsol, isCustomerConsol, isAgilityConsolHouse, ');
printjson('isCustomerConsolHouse, isEmptyConsol, isBackToBack, ');
printjson('isDirect, isNoTransport, isRoad, isAir, isOcean, isRail, ');
printjson('isCourier, isMultiModal, isBrokerage, isCrossTrade,');
printjson('isProjectLogistics, isChemicals');
printjson('-------------------------------------------------------------');
printjson('Format:');
printjson('query([array of countries], [array of scenarios], showExample?)');
printjson('-------------------------------------------------------------');
printjson('Example:');
printjson("query(['United States', 'India'], ['isBackToBack', 'isAir'], true)");
printjson('-------------------------------------------------------------');

const query = (countries, scenarios, printExample) => {
  const baseQuery = {
    isAgilityConsol: false,
    isCustomerConsol: false,
    isAgilityConsolHouse: false,
    isCustomerConsolHouse: false,
    isEmptyConsol: false,
    isBackToBack: false,
    isDirect: false,
    isNoTransport: false,
    isRoad: false,
    isAir: false,
    isOcean: false,
    isRail: false,
    isCourier: false,
    isMultiModal: false,
    isBrokerage: false,
    isCrossTrade: false,
    isProjectLogistics: false,
    isChemicals: false,
  };

  const userQuery = Object.keys(baseQuery).reduce(
    (prev, key) =>
      scenarios.indexOf(key) === -1
        ? Object.assign({}, prev, { [key]: false })
        : prev,
    {}
  );
  userQuery.countries = { $not: { $elemMatch: { $nin: countries } } };
  if (printExample) {
    printjson('Example:');
    printjson(db.analyzedJobs.findOne(userQuery));
  }
  printjson(`${db.analyzedJobs.count(userQuery)} jobs found`);
};
