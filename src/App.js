import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [singleCity, setSingleCity] = useState("");
  const [cities, setCities] = useState(null);
  const [singleCountry, setSingleCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [submit,setSubmit] = useState("false");
  const fetchCountries = async () => {
    try {
      const country = await axios.get("https://countriesnow.space/api/v0.1/countries");
      setCountries(country.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCities = (country) => {
    setSubmit(false);
    setSingleCity(null);
    //setSingleCountry(null);
    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    //console.log(findCities);
    setCities(findCities.cities);
  }
  useEffect(() => {
    fetchCountries();

  }, [])

  const submitHandle = ()=>{
    if(singleCity && singleCountry){
      setSubmit(true);

    }
  }

  return (
    <div className="App">
      <div className='App-header'>
        <h1>Select your country and city</h1>
        <div>
          {countries && <select onChange={(e) => fetchCities(e.target.value)} value={singleCountry}>
            <option disabled selected hidden>Select country</option>
            {
              countries.map((country) => (
                <option key={`${country.country}`} value={country.country}>{country.country}</option>

              ))
            }

          </select>
          }
          {cities && (<select onChange={(e)=> setSingleCity(e.target.value)} value={singleCity}>
            <option disabled selected hidden>Select city</option>
            {
              cities.map((city) => (
                <option value={city} key={city}>{city} </option>
              ))
            }

          </select>
          )}
          <button onClick={submitHandle}>Add</button>
        </div>
        { submit && <h3>your country is {singleCountry} and your city is {singleCity}</h3>}

      </div>
      {/* {userDetails && <img src={userDetails.picture.large}></img>} */}


    </div>
  );
}

export default App;
