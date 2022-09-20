import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useFetchApi from '../components/services/useFetchApi';

function StarWarsProvider({ children }) {
  const { planetList, getPlanets } = useFetchApi();
  const [filterByName, setFilterByName] = useState('');

  const filteredPlanetName = filterByName.length > 0 ? planetList
    .filter((planet) => planet.name.includes(filterByName)) : planetList;

  const handleChangeName = ({ target: { value } }) => {
    setFilterByName(value);
  };

  const context = {
    planetList,
    getPlanets,
    filterByName,
    setFilterByName,
    filteredPlanetName,
    handleChangeName,
  };

  return (
    <main>
      <StarWarsContext.Provider value={ context }>
        { children }
      </StarWarsContext.Provider>
    </main>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
