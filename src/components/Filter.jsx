import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const { filterByName, handleChangeName } = useContext(StarWarsContext);
  // console.log(filterByName);
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
    </main>
  );
}

export default Filter;
