load('pipe.js');
load('combineJobs.js');
load('addHouses.js');
load('labelCustomerConsols.js');
load('labelAgilityConsols.js');
load('labelEmptyConsols.js');
load('labelCustomerConsolHouses.js');
load('labelAgilityConsolHouses.js');
load('labelBackToBack.js');
load('labelDirect.js');
load('labelProducts.js');
load('labelCrossTrade.js');
load('stats.js');

db.counts.remove({});
db.analyzedJobs.remove({});
const COMPANIES = db.companies.find({}).toArray();

COUNTRY_CODES.forEach(originCountry => {
  const rawJobs = db.rawJobs
    .find({ 'Origin Country': originCountry })
    .toArray();

  const analyzedJobs = pipe(rawJobs, [
    combineJobs,
    addHouses,
    labelCustomerConsols,
    labelAgilityConsols,
    labelEmptyConsols,
    labelCustomerConsolHouses,
    labelAgilityConsolHouses,
    labelBackToBack,
    labelDirect,
    labelProducts,
    labelCrossTrade,
  ]);

  const stats = getStats(analyzedJobs);

  printjson(`Origin Country: ${originCountry}`);
  printjson(stats);

  db.analyzedJobs.insertMany(analyzedJobs);

  stats.originCountry = originCountry;
  db.counts.insert(stats);
});
