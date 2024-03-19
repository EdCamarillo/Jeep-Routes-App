import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [jeepCodes, setJeepCodes] = useState('');
  const [jeepRoutes, setJeepRoutes] = useState([]);

  const routes = {
    '01A': ['Alpha', 'Bravo', 'Charlie', 'Echo', 'Golf'],
    '02B': ['Alpha', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '03C': ['Charlie', 'Delta', 'Foxtrot', 'Hotel', 'India'],
    '04A': ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '04D': ['Charlie', 'Echo', 'Foxtrot', 'Golf', 'India'],
    '06B': ['Delta', 'Hotel', 'Juliet', 'Kilo', 'Lima'],
    '06D': ['Delta', 'Foxtrot', 'Golf', 'India', 'Kilo'],
    '10C': ['Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet'],
    '10H': ['Foxtrot', 'Hotel', 'Juliet', 'Lima', 'November'],
    '11A': ['Foxtrot', 'Golf', 'Kilo', 'Mike', 'November'],
    '11B': ['Foxtrot', 'GOlf', 'Lima', 'Oscar', 'Papa'],
    '20A': ['India', 'Juliet', 'November', 'Papa', 'Romeo'],
    '20C': ['India', 'Kilo', 'Lima', 'Mike', 'Romeo'],
    '42C': ['Juliet', 'Kilo', 'Lima', 'Mike', 'Oscar'],
    '42D': ['Juliet', 'November', 'Oscar', 'Quebec', 'Romeo'],
  }

  const handleChange = (event) => {
    setJeepCodes(event.target.value);
  };

  const handleButtonClick = () => {
    const enteredCodesArray = jeepCodes.split(',').map(code => code.trim());
    const invalidCodes = enteredCodesArray.filter(code => !routes.hasOwnProperty(code));

    if (invalidCodes.length > 0) {
      alert(`Invalid Jeep code(s): ${invalidCodes.join(', ')}`);
      return;
    }

    let routesForJeepCodes = [];
    enteredCodesArray.forEach(code => {
      if (routes.hasOwnProperty(code)) {
        routesForJeepCodes.push({ code, places: routes[code] });
      }
    });

    const commonPlaces = {};
    routesForJeepCodes.forEach(route => {
      route.places.forEach(place => {
        if (!commonPlaces[place]) {
          commonPlaces[place] = { codes: [route.code], color: getRandomColor() };
        } else {
          commonPlaces[place].codes.push(route.code);
        }
      });
    });

    const highlightedRoutes = routesForJeepCodes.map(route => {
      const highlightedPlaces = route.places.map(place => {
        const commonPlace = commonPlaces[place];
        if (commonPlace.codes.length > 1) {
          return `<span style="color: ${commonPlace.color}">${place}</span>`;
        } else {
          return place;
        }
      });
      return `${route.code} => ${highlightedPlaces.join(' <-> ')}`;
    });

    setJeepRoutes(highlightedRoutes);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          value={jeepCodes}
          onChange={handleChange}
          placeholder="Enter Jeep Code"
          className="jeep-code-input"
        />
        <button
          onClick={handleButtonClick}
          style={{
            width: '150px',
            height: '40px',
            fontSize: '16px',
            backgroundColor: '#79b0e0',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Get Routes
        </button>
      </div>
      <div className="route-container">
        {jeepRoutes.length > 0 &&
          <div>
            <h3>Routes:</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize:'21px' }}>
              {jeepRoutes.map((route, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: route }}></li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
