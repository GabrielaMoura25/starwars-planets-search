import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useFetchApi from '../components/services/useFetchApi';

function StarWarsProvider({ children }) {
  const { planetList, getPlanets, setPlanetList, planetListOrigin } = useFetchApi();

  const [filterByName, setFilterByName] = useState('');
  const [columnSelect, setColumnSelect] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [values, setValues] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: columnSelect[0],
    comparison: 'maior que',
    valueF: 0,
  });
  const [concatFilters, setConcatFilters] = useState([]);

  const filteredPlanetName = filterByName.length > 0 ? planetList
    .filter((planet) => (planet.name).toLowerCase()
      .includes(filterByName.toLowerCase())) : planetList;

  const handleChangeName = ({ target: { value } }) => {
    setFilterByName(value);
  };

  const handleChangeAll = ({ target: { value, name } }) => {
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value });
  };

  const context = {
    planetList,
    getPlanets,
    setPlanetList,
    filterByName,
    setFilterByName,
    filteredPlanetName,
    handleChangeName,
    concatFilters,
    columnSelect,
    setColumnSelect,
    comparisonSelect,
    setComparisonSelect,
    values,
    setValues,
    filterByNumericValues,
    setFilterByNumericValues,
    setConcatFilters,
    handleChangeAll,
    planetListOrigin,
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
