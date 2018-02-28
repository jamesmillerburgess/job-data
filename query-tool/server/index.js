import { Meteor } from 'meteor/meteor';
import { Mongo, MongoInternals } from 'meteor/mongo';

const AnalyzedJobs = new Mongo.Collection('analyzedJobs');
const GameSubmissions = new Mongo.Collection('gameSubmissions');

const search = ({ name, countries, scenarios }) => {
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
  const numJobs = AnalyzedJobs.find(userQuery).count();
  GameSubmissions.insert({ name, countries, scenarios, numJobs });
};

const clearResults = () => GameSubmissions.remove({});

const gameSubmissions = () => GameSubmissions.find();

Meteor.methods({ search, clearResults });
Meteor.publish({ gameSubmissions });
