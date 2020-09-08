import React, { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Header, LineGraph, CardData, Table, Map } from './components/index';
import { Card, CardContent } from '@material-ui/core';
import * as constants from './constants';
import { sortData, prettyPrintStat } from './utils';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(constants.DEFAULT_COUNTRY);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(constants.DEFAULT_COORDINDATES);
  const [mapZoom, setMapZoom] = useState(constants.DEFAULT_ZOOM);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch(`${constants.apiURL}/all`)
      .then(response => response.json())
      .then(data => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      let response = await fetch(`${constants.apiURL}/countries`);
      const data = await response.json();
      const countries = data.map(country => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const countriesSorted = sortData(data);
      setCountries(countries);
      setTableData(countriesSorted);
      setMapCountries(data);
    };
    getCountries();
  }, []);

  const getCurrentCountry = async country => {
    const countryCode = country;
    const url =
      countryCode === constants.DEFAULT_COUNTRY
        ? `${constants.apiURL}/all`
        : `${constants.apiURL}/countries/${countryCode}`;
    const response = await fetch(url);
    const data = await response.json();
    setCountryInfo(data);
    setCountry(countryCode);
    const worlwide = countryCode === constants.DEFAULT_COUNTRY;
    if (worlwide) {
      setMapCenter(constants.DEFAULT_COORDINDATES);
      setMapZoom(constants.DEFAULT_ZOOM);
      return;
    }
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  };

  return (
    <div className='app'>
      <div className='app__left'>
        <Header
          countries={countries}
          country={country}
          getCurrentCountry={getCurrentCountry}
        />
        <div className='app__stats'>
          <CardData
            isRed
            active={casesType === 'cases'}
            onClick={() => setCasesType('cases')}
            title='Coronavirus Cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <CardData
            active={casesType === 'recovered'}
            title='Recoved'
            onClick={() => setCasesType('recovered')}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <CardData
            isRed
            active={casesType === 'deaths'}
            onClick={() => setCasesType('deaths')}
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Lives cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className='app__graph' casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
