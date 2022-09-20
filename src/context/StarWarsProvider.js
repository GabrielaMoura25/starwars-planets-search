import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useFetchApi from '../components/services/useFetchApi';

function StarWarsProvider({ children }) {
  const { planetList, getPlanets } = useFetchApi();

  const context = {
    planetList,
    getPlanets,
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
