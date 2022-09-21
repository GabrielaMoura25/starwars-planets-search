import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const { filterByName, handleChangeName, handleChangeValue,
    handleChangeComparison, handleChangeColumn,
    planetList, setPlanetList, column, comparison, valueF } = useContext(StarWarsContext);
  // console.log(filterByName);

  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterConcat = (planeta, coluna, compar, values) => {
    switch (compar) {
    case 'maior que':
      return planeta.filter((planet) => Number(planet[coluna]) > Number(values));
    case 'menor que':
      return planeta.filter((planet) => Number(planet[coluna]) < Number(values));
    case 'igual a':
      return planeta.filter((planet) => Number(planet[coluna]) === Number(values));
    default:
      return planeta;
    }
  };

  const handleConcat = () => {
    let newArrayPlanet = [];
    newArrayPlanet = filterConcat(planetList, column, comparison, valueF);
    setPlanetList(newArrayPlanet);
  };

  return (
    <main>
      <input
        type="text"
        name="filterByName"
        id="filterByName"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ handleChangeName }
        placeholder="Nome"
      />
      <label htmlFor="column-filter">
        Filter for column:
        <select
          id="column-filter"
          data-testid="column-filter"
          name="column-filter"
          value={ column }
          onChange={ handleChangeColumn }
        >
          {options.map((option) => (
            <option value={ option } key={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      {/* <button type="button" onClick={ removeFilters }>X</button> */}
      <label htmlFor="comparison-filter">
        Comparison Filter:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison-filter"
          value={ comparison }
          onChange={ handleChangeComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      {/* <button type="button" onClick={ removeFilters }>X</button> */}
      <label htmlFor="value-filter">
        Value filter:
        <input
          id="value-filter"
          data-testid="value-filter"
          type="number"
          value={ valueF }
          min="0"
          onChange={ handleChangeValue }
        />
      </label>
      {/* <button type="button" onClick={ removeFilters }>X</button> */}
      <button
        id="button-filter"
        type="button"
        data-testid="button-filter"
        onClick={ handleConcat }
      >
        Filter:
      </button>
    </main>
  );
}

export default Filter;
