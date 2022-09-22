import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const {
    filterByName,
    handleChangeName,
    handleChangeAll,
    setPlanetList,
    columnSelect,
    planetListOrigin,
    filterByNumericValues,
    setFilterByNumericValues,
    setColumnSelect,
    concatFilters,
    setConcatFilters } = useContext(StarWarsContext);

  const removeFilters = ({ target: { id } }) => {
    setConcatFilters(concatFilters.filter((fil) => fil.column !== id));
    setColumnSelect([...columnSelect, id]);
  };

  const removeAllFilters = () => {
    setConcatFilters([]);
    setColumnSelect([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  useEffect(() => {
    if (!concatFilters.length) return setPlanetList(planetListOrigin);
    let filtered = planetListOrigin;
    concatFilters.forEach((filter) => {
      const { column, comparison, valueF } = filter;
      if (comparison === 'maior que') {
        filtered = filtered.filter((a) => Number(a[column]) > Number(valueF));
      } if (comparison === 'menor que') {
        filtered = filtered.filter((a) => Number(a[column]) < Number(valueF));
      } if (comparison === 'igual a') {
        filtered = filtered.filter((a) => Number(a[column]) === Number(valueF));
      }
      setPlanetList(filtered);
    });
  }, [concatFilters]);

  const filter = () => {
    setConcatFilters([...concatFilters, filterByNumericValues]);
    setColumnSelect(columnSelect
      .filter((option) => option !== filterByNumericValues.column));
    setFilterByNumericValues({
      column: columnSelect[0],
      comparison: 'maior que',
      valueF: 0,
    });
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
          name="column"
          value={ filterByNumericValues.column }
          onChange={ handleChangeAll }
        >
          {columnSelect.map((option) => (
            <option value={ option } key={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison Filter:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ handleChangeAll }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Value filter:
        <input
          name="valueF"
          id="value-filter"
          data-testid="value-filter"
          type="number"
          value={ filterByNumericValues.valueF }
          onChange={ handleChangeAll }
        />
      </label>
      <button
        id="button-filter"
        type="button"
        data-testid="button-filter"
        onClick={ filter }
      >
        Filter
      </button>
      {concatFilters.length > 0 && concatFilters.map(({ column, comparison, valueF }) => (
        <div data-testid="filter" key={ column }>
          <span>{ `${column} ${comparison} ${valueF}` }</span>
          <button type="button" id={ column } onClick={ removeFilters }>X</button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos

      </button>
    </main>
  );
}

export default Filter;
