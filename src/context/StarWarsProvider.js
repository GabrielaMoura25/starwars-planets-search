import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useFetchApi from '../components/services/useFetchApi';

function StarWarsProvider({ children }) {
  const { planetList, getPlanets, setPlanetList } = useFetchApi();
  const [filterByName, setFilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueF, setValueF] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const concatFilters = () => {
    setFilterByNumericValues(
      filterByNumericValues.concat({
        column,
        comparison,
        value: valueF,
      }),
    );
  };

  const filteredPlanetName = filterByName.length > 0 ? planetList
    .filter((planet) => planet.name.includes(filterByName)) : planetList;

  const handleChangeName = ({ target: { value } }) => {
    setFilterByName(value);
  };

  const handleChangeColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const handleChangeComparison = ({ target: { value } }) => {
    setComparison(value);
  };

  const handleChangeValue = ({ target: { value } }) => {
    setValueF(value);
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
    column,
    handleChangeColumn,
    comparison,
    handleChangeComparison,
    valueF,
    handleChangeValue,
    filterByNumericValues,
    setFilterByNumericValues,
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
