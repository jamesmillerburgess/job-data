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

const PRODUCTS = [
  'isAir',
  // 'isCourier',
  // 'isMultiModal',
  'isOcean',
  // 'isRail',
  // 'isRoad',
];

const SCENARIOS = [
  'isAgilityConsolHouse',
  'isBackToBack',
  'isCrossTrade',
  'isCustomerConsol',
  'isDirect',
];

const SPECIALTIES = ['isBrokerage', 'isChemicals', 'isProjectLogistics'];

const COUNTRIES = [
  // 'Angola',
  // 'Austraila',
  // 'Austria',
  // 'Bahrain',
  // 'Bangladesh',
  // 'Belgium',
  // 'Cambodia',
  // 'Canada',
  // 'Czech Republic',
  // 'Chile',
  'China',
  // 'Colombia',
  // 'Denmark',
  // 'Egypt',
  // 'Finland',
  // 'France',
  'Germany',
  'Hong Kong',
  // 'Hungary',
  // 'India',
  // 'Indonesia',
  // 'Iraq',
  // 'Ireland',
  // 'Italy',
  // 'Japan',
  // 'Jordan',
  // 'Kenya',
  // 'Kuwait',
  // 'Lebanon',
  // 'Malaysia',
  // 'Mexico',
  // 'Netherlands',
  // 'New Zealand',
  // 'Nigeria',
  // 'Norway',
  // 'Oman',
  // 'Pakistan',
  // 'Papua New Guinea',
  // 'Peru',
  // 'Philippines',
  // 'Poland',
  // 'Portugal',
  // 'Qatar',
  // 'Romania',
  // 'Saudi Arabia',
  // 'Singapore',
  // 'South Africa',
  // 'South Korea',
  // 'Spain',
  // 'Sri Lanka',
  // 'Sweden',
  // 'Switzerland',
  // 'Taiwan',
  // 'Thailand',
  // 'Turkey',
  // 'United Arab Emirates',
  // 'United Kingdom',
  'United States',
  // 'Vietnam',
];

let max = -1;
let products = [0, 0];
let scenarios = [0, 0];
let specialty = 0;
let countries = [0, 0, 0, 0];

const getJobCount = () => {
  let userQuery = {};
  Object.keys(baseQuery).forEach(key => {
    if (
      PRODUCTS[products[0]] !== key &&
      PRODUCTS[products[1]] !== key &&
      SCENARIOS[scenarios[0]] !== key &&
      SCENARIOS[scenarios[1]] !== key &&
      SPECIALTIES[specialty] !== key
    ) {
      userQuery[key] = false;
    }
  });
  userQuery.countries = {
    $not: {
      $elemMatch: {
        $nin: [
          COUNTRIES[countries[0]],
          COUNTRIES[countries[1]],
          COUNTRIES[countries[2]],
          COUNTRIES[countries[3]],
        ],
      },
    },
  };
  // printjson(userQuery);
  const jobCount = db.analyzedJobs.count(userQuery);
  return jobCount;
};

for (let i = 0; i < 5000; i++) {
  products[0] = Math.floor(Math.random() * PRODUCTS.length);
  products[1] = Math.floor(Math.random() * (PRODUCTS.length - 1));
  if (products[1] === products[0]) {
    products[1]++;
  }
  scenarios[0] = Math.floor(Math.random() * SCENARIOS.length);
  scenarios[1] = Math.floor(Math.random() * (SCENARIOS.length - 1));
  if (scenarios[1] === scenarios[0]) {
    scenarios[1]++;
  }
  specialty = Math.floor(Math.random() * SPECIALTIES.length);
  countries[0] = Math.floor(Math.random() * COUNTRIES.length);
  countries[1] = Math.floor(Math.random() * (COUNTRIES.length - 1));
  if (countries[1] === countries[0]) {
    countries[1]++;
  }
  countries[2] = Math.floor(Math.random() * (COUNTRIES.length - 1));
  if (countries[2] === countries[0] || countries[2] === countries[1]) {
    countries[2]++;
  }
  countries[3] = Math.floor(Math.random() * (COUNTRIES.length - 1));
  if (
    countries[3] === countries[0] ||
    countries[3] === countries[1] ||
    countries[3] === countries[2]
  ) {
    countries[3]++;
  }
  countries = [0, 1, 2, 3];
  const jobCount = getJobCount();
  printjson(`${i}: ${jobCount}`);
  if (jobCount > max) {
    max = jobCount;
    const maxOptions = {
      products: [PRODUCTS[products[0]], PRODUCTS[products[1]]],
      scenarios: [SCENARIOS[scenarios[0]], SCENARIOS[scenarios[1]]],
      specialty: SPECIALTIES[specialty],
      countries: [
        COUNTRIES[countries[0]],
        COUNTRIES[countries[1]],
        COUNTRIES[countries[2]],
        COUNTRIES[countries[3]],
      ],
    };
    printjson(`Product 1  : ${PRODUCTS[products[0]]}`);
    printjson(`Product 2  : ${PRODUCTS[products[1]]}`);
    printjson(`Scenario 1 : ${SCENARIOS[scenarios[0]]}`);
    printjson(`Scenario 2 : ${SCENARIOS[scenarios[1]]}`);
    printjson(`Specialty  : ${SPECIALTIES[specialty]}`);
    printjson(`Country 1  : ${COUNTRIES[countries[0]]}`);
    printjson(`Country 2  : ${COUNTRIES[countries[1]]}`);
    printjson(`Country 3  : ${COUNTRIES[countries[2]]}`);
    printjson(`Country 4  : ${COUNTRIES[countries[3]]}`);
    printjson(`New max: ${max}`);
  }
}

// for (countries[0] = 0; countries[0] < COUNTRIES.length; countries[0]++) {
//   for (
//     countries[1] = countries[0] + 1;
//     countries[1] < COUNTRIES.length;
//     countries[1]++
//   ) {
//     for (
//       countries[2] = countries[1] + 1;
//       countries[2] < COUNTRIES.length;
//       countries[2]++
//     ) {
//       for (
//         countries[3] = countries[2] + 1;
//         countries[3] < COUNTRIES.length;
//         countries[3]++
//       ) {
//         for (products[0] = 0; products[0] < PRODUCTS.length; products[0]++) {
//           for (
//             products[1] = products[0] + 1;
//             products[1] < PRODUCTS.length;
//             products[1]++
//           ) {
//             for (
//               scenarios[0] = 0;
//               scenarios[0] < SCENARIOS.length;
//               scenarios[0]++
//             ) {
//               for (
//                 scenarios[1] = scenarios[0] + 1;
//                 scenarios[1] < SCENARIOS.length;
//                 scenarios[1]++
//               ) {
//                 for (
//                   specialty = 0;
//                   specialty < SPECIALTIES.length;
//                   specialty++
//                 ) {
//                   const jobCount = getJobCount();
//                   if (jobCount > max) {
//                     max = jobCount;
//                     const maxOptions = {
//                       products: [PRODUCTS[products[0]], PRODUCTS[products[1]]],
//                       scenarios: [
//                         SCENARIOS[scenarios[0]],
//                         SCNEARIOS[scenarios[1]],
//                       ],
//                       specialty: SPECIALTIES[specialty],
//                       countries: [
//                         COUNTRIES[countries[0]],
//                         COUNTRIES[countries[1]],
//                         COUNTRIES[countries[2]],
//                         COUNTRIES[countries[3]],
//                       ],
//                     };
//                     printjson(`Product 1  : ${PRODUCTS[products[0]]}`);
//                     printjson(`Product 2  : ${PRODUCTS[products[1]]}`);
//                     printjson(`Scenario 1 : ${SCENARIOS[scenarios[0]]}`);
//                     printjson(`Scenario 2 : ${SCENARIOS[scenarios[1]]}`);
//                     printjson(`Specialty  : ${SPECIALTIES[specialty]}`);
//                     printjson(`Country 1  : ${COUNTRIES[countries[0]]}`);
//                     printjson(`Country 2  : ${COUNTRIES[countries[1]]}`);
//                     printjson(`Country 3  : ${COUNTRIES[countries[2]]}`);
//                     printjson(`Country 4  : ${COUNTRIES[countries[3]]}`);
//                     printjson(`New max: ${max}`);
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

printjson(`Product 1  : ${maxOptions.products[0]}`);
printjson(`Product 2  : ${maxOptions.products[1]}`);
printjson(`Scenario 1 : ${maxOptions.scenarios[0]}`);
printjson(`Scenario 2 : ${maxOptions.scenarios[1]}`);
printjson(`Specialty  : ${maxOptions.specialty}`);
printjson(`Country 1  : ${maxOptions.countries[0]}`);
printjson(`Country 2  : ${maxOptions.countries[1]}`);
printjson(`Country 3  : ${maxOptions.countries[2]}`);
printjson(`Country 4  : ${maxOptions.countries[3]}`);
printjson(`Max: ${max}`);
