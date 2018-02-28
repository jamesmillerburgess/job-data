import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createContainer } from 'meteor/react-meteor-data';

import Results from './Results';

const GameSubmissions = new Mongo.Collection('gameSubmissions');

const sort = (a, b) => a.numJobs < b.numJobs;

const linkMeteorData = props => {
  const loading = !Meteor.subscribe('gameSubmissions').ready();
  const gameSubmissions = GameSubmissions.find()
    .fetch()
    .sort(sort);
  return { gameSubmissions };
};

const ResultsContainer = createContainer(linkMeteorData, Results);

export default ResultsContainer;
