import React, { Component } from 'react';
import Banner from 'react-js-banner';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Input,
  Col
} from 'reactstrap';

import Weather from './weather';

// the webpage seen on localhost:3000
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: '',
      message: ''
    };
  }
  
  // fetch cities data from api
  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };
  
  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  // add city to db for api calls
  handleAddCity = () => {
    // check for properly formatted and correct input
    if (this.state.newCityName === null || this.state.newCityName.match(/^ *$/) !== null) {
      this.setState({ message: 'Cannot input blank city.' })
      return
    }
    if (this.state.newCityName[0] !== this.state.newCityName[0].toUpperCase()) {
      this.setState({ message: 'City names must start with a capital.' })
      return
    }
    if (this.state.cityList.includes(this.state.newCityName)) {
      this.setState({ message: 'No duplicate city names allowed.' })
      return
    }
    fetch('/api/cities', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json())
    .then(res => {
      this.getCityList();
      this.setState({ newCityName: '' });
    });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({ weather });
    });
  }

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  }

  componentDidMount () {
    this.getCityList();
  }
  
  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyWeather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities!!!</p>
              <InputGroup>
                <Input
                  placeholder="New city name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>
              </InputGroup>
              <div className="result">{ this.state.message }</div>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                { this.state.cityList.length > 0 && <option>Select a city.</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }
}

export default App;