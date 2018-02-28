import React from 'react';
import { Meteor } from 'meteor/meteor';

const SCENARIOS = {
  isAgilityConsolHouse: 'Agility Consol',
  isAir: 'Air',
  isBackToBack: 'Back to Back',
  isBrokerage: 'Brokerage',
  isChemicals: 'Chemicals',
  isCourier: 'Courier',
  isCrossTrade: 'Cross Trade',
  isCustomerConsolHouse: 'Customer Consol',
  isDirect: 'Direct',
  isMultiModal: 'Multi Modal',
  isOcean: 'Ocean',
  isProjectLogistics: 'Project Logistics',
  isRail: 'Rail',
  isRoad: 'Road',
};

const Results = props => (
  <div className="game results">
    <h2>Results</h2>
    <div className="results">
      {props.gameSubmissions.map((submission, i) => (
        <div
          className={`submission ${i === 0 ? 'winner' : ''}`}
          key={submission._id}
        >
          <div className="rank">{i + 1})</div>
          <div className="name">
            <span className={`fa fa-fw ${i === 0 ? 'fa-trophy' : ''}`} />{' '}
            {submission.name}
          </div>
          <div className="num-jobs">{submission.numJobs.toLocaleString()}</div>
          <div className="hover-text">
            <div className="scenarios">
              <div className="list">
                <div className="list-title">Products:</div>
                <div className="list-item">
                  {SCENARIOS[submission.scenarios[0]]}
                </div>
                <div className="list-item">
                  {SCENARIOS[submission.scenarios[1]]}
                </div>
              </div>
              <div className="list">
                <div className="list-title">Scenarios:</div>
                <div className="list-item">
                  {SCENARIOS[submission.scenarios[2]]}
                </div>
                <div className="list-item">
                  {SCENARIOS[submission.scenarios[3]]}
                </div>
              </div>
            </div>
            <div className="list">
              <div className="list">
                <div className="list-title">Specialty:</div>
                <div className="list-item">
                  {SCENARIOS[submission.scenarios[4]]}
                </div>
              </div>
              <div className="countries">
                <div className="list-title">Countries:</div>
                <div className="list-item">{submission.countries[0]}</div>
                <div className="list-item">{submission.countries[1]}</div>
                <div className="list-item">{submission.countries[2]}</div>
                <div className="list-item">{submission.countries[3]}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <button onClick={() => Meteor.call('clearResults')}>Clear</button>
  </div>
);

export default Results;
