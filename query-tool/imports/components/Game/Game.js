import React from 'react';
import { Meteor } from 'meteor/meteor';

const SCENARIOS = {
  'Agility Consol': 'isAgilityConsolHouse',
  Air: 'isAir',
  'Back to Back': 'isBackToBack',
  Brokerage: 'isBrokerage',
  Chemicals: 'isChemicals',
  Courier: 'isCourier',
  'Cross Trade': 'isCrossTrade',
  'Customer Consol': 'isCustomerConsolHouse',
  Direct: 'isDirect',
  'Multi Modal': 'isMultiModal',
  Ocean: 'isOcean',
  'Project Logistics': 'isProjectLogistics',
  Rail: 'isRail',
  Road: 'isRoad',
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: ['', '', '', ''],
      scenarios: ['', '', '', '', ''],
    };
    this.ProductSelect = this.ProductSelect.bind(this);
    this.SpecialtySelect = this.SpecialtySelect.bind(this);
    this.CountrySelect = this.CountrySelect.bind(this);
    this.ScenarioSelect = this.ScenarioSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  CountrySelect(props) {
    return (
      <select
        onChange={e => {
          const newCountries = this.state.countries;
          newCountries[props.index] = e.target.value;
          this.setState({ countries: newCountries });
        }}
      >
        <option />
        <option>Angola</option>
        <option>Austraila</option>
        <option>Austria</option>
        <option>Bahrain</option>
        <option>Bangladesh</option>
        <option>Belgium</option>
        <option>Cambodia</option>
        <option>Canada</option>
        <option>Czech Republic</option>
        <option>Chile</option>
        <option>China</option>
        <option>Colombia</option>
        <option>Denmark</option>
        <option>Egypt</option>
        <option>Finland</option>
        <option>France</option>
        <option>Germany</option>
        <option>Hong Kong</option>
        <option>Hungary</option>
        <option>India</option>
        <option>Indonesia</option>
        <option>Iraq</option>
        <option>Ireland</option>
        <option>Italy</option>
        <option>Japan</option>
        <option>Jordan</option>
        <option>Kenya</option>
        <option>Kuwait</option>
        <option>Lebanon</option>
        <option>Malaysia</option>
        <option>Mexico</option>
        <option>Netherlands</option>
        <option>New Zealand</option>
        <option>Nigeria</option>
        <option>Norway</option>
        <option>Oman</option>
        <option>Pakistan</option>
        <option>Papua New Guinea</option>
        <option>Peru</option>
        <option>Philippines</option>
        <option>Poland</option>
        <option>Portugal</option>
        <option>Qatar</option>
        <option>Romania</option>
        <option>Saudi Arabia</option>
        <option>Singapore</option>
        <option>South Africa</option>
        <option>South Korea</option>
        <option>Spain</option>
        <option>Sri Lanka</option>
        <option>Sweden</option>
        <option>Switzerland</option>
        <option>Taiwan</option>
        <option>Thailand</option>
        <option>Turkey</option>
        <option>United Arab Emirates</option>
        <option>United Kingdom</option>
        <option>United States</option>
        <option>Vietnam</option>
      </select>
    );
  }

  ProductSelect(props) {
    return (
      <select
        onChange={e => {
          const newScenarios = this.state.scenarios;
          newScenarios[props.index] = SCENARIOS[e.target.value];
          this.setState({ scenarios: newScenarios });
        }}
      >
        <option />
        <option>Air</option>
        <option>Courier</option>
        <option>Multi Modal</option>
        <option>Ocean</option>
        <option>Rail</option>
        <option>Road</option>
      </select>
    );
  }

  ScenarioSelect(props) {
    return (
      <select
        onChange={e => {
          const newScenarios = this.state.scenarios;
          newScenarios[props.index] = SCENARIOS[e.target.value];
          this.setState({ scenarios: newScenarios });
        }}
      >
        <option />
        <option>Agility Consol</option>
        <option>Back to Back</option>
        <option>Cross Trade</option>
        <option>Customer Consol</option>
        <option>Direct</option>
      </select>
    );
  }

  SpecialtySelect(props) {
    return (
      <select
        onChange={e => {
          const newScenarios = this.state.scenarios;
          newScenarios[4] = SCENARIOS[e.target.value];
          this.setState({ scenarios: newScenarios });
        }}
      >
        <option />
        <option>Brokerage</option>
        <option>Chemicals</option>
        <option>Project Logistics</option>
      </select>
    );
  }

  handleSubmit() {
    const name = this.state.name;
    const countries = this.state.countries.filter(country => country !== '');
    const scenarios = this.state.scenarios.filter(scenario => scenario !== '');
    Meteor.call('search', { name, countries, scenarios });
    this.setState({ isSubmitted: true });
  }

  render() {
    if (this.state.isSubmitted) {
      return (
        <div className="game">
          <div className="title">Thanks for your submission!</div>
        </div>
      );
    }
    return (
      <div className="game">
        <img src="/wheres-the-beef.jpg" width="300" />
        <div className="title">Where's the volume?</div>
        <div className="form-section">
          <h2>Your Name</h2>
          <input onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="form-section">
          <h2>Products</h2>
          <div className="select-group">
            <this.ProductSelect index={0} />
            <this.ProductSelect index={1} />
          </div>
        </div>
        <div className="form-section">
          <h2>Scenarios</h2>
          <div className="select-group">
            <this.ScenarioSelect index={2} />
            <this.ScenarioSelect index={3} />
          </div>
        </div>
        <div className="form-section">
          <h2>Specialty</h2>
          <div className="select-group">
            <this.SpecialtySelect index={4} />
          </div>
        </div>
        <div className="form-section">
          <h2>Countries</h2>
          <div className="select-group">
            {this.state.countries.map((_, i) => (
              <this.CountrySelect key={i} index={i} />
            ))}
          </div>
        </div>
        <button onClick={this.handleSubmit}>Submit!</button>
      </div>
    );
  }
}

export default Game;
