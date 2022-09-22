import { useEffect, useState } from 'react';

function useFetchApi() {
  const [planetList, setPlanetList] = useState([]);
  const [planetListOrigin, setPlanetListOrigin] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const url = 'https://swapi.dev/api/planets';
        const response = await fetch(url);
        const { results } = await response.json();
        const filteredResults = results.filter((item) => delete item.residents);
        setPlanetList(filteredResults);
        setPlanetListOrigin(filteredResults);
      } catch (error) {
        console.log('API endpoint not found');
      }
    };
    getPlanets();
  }, []);

  return { planetList, setPlanetList, planetListOrigin };
}

export default useFetchApi;
