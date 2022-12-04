import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

const ROW_ROLE_SELECTOR = 'row';
const COLUMN_ROLE_SELECTOR = 'columnheader';
const INPUT_FILTER_NAME_SELECTOR = 'name-filter';
const COLUMN_FILTER_SELECTOR = 'column-filter';
const COMPARISON_FILTER_SELECTOR = 'comparison-filter';
const VALUE_FILTER_SELECTOR = 'value-filter';
const BUTTON_FILTER_SELECTOR = 'button-filter';
const REMOVE_FILTER_SELECTOR = 'filter';
const PLANET_NAME_SELECTOR = 'planet-name';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
}

describe('1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  it('Realize uma requisição para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Preencha a tabela com os dados retornados', async () => {
    await act(async () => {
      render(<App />);
    });
    const planets = testData.results;
    for(let planetIndex in planets) {
      const name = await screen.findByText(planets[planetIndex].name);
      const rotationPeriod = await screen.findAllByText(planets[planetIndex].rotation_period);
      const orbitalPeriod = await screen.findAllByText(planets[planetIndex].orbital_period);
      const diameter = await screen.findAllByText(planets[planetIndex].diameter);
      const climate = await screen.findAllByText(planets[planetIndex].climate);
      const gravity = await screen.findAllByText(planets[planetIndex].gravity);
      const terrain = await screen.findAllByText(planets[planetIndex].terrain);
      const surfaceWater = await screen.findAllByText(planets[planetIndex].surface_water);
      const population = await screen.findAllByText(planets[planetIndex].population);

      expect(name).toBeInTheDocument();
      expect(rotationPeriod.length).toBeGreaterThanOrEqual(1);
      expect(orbitalPeriod.length).toBeGreaterThanOrEqual(1);
      expect(diameter.length).toBeGreaterThanOrEqual(1);
      expect(climate.length).toBeGreaterThanOrEqual(1);
      expect(gravity.length).toBeGreaterThanOrEqual(1);
      expect(terrain.length).toBeGreaterThanOrEqual(1);
      expect(surfaceWater.length).toBeGreaterThanOrEqual(1);
      expect(population.length).toBeGreaterThanOrEqual(1);
    };
  });

  it('Verifique se a tabela tem 13 colunas', async () => {
    await act(async () => {
      render(<App />);
    });
    // a requisição (mock) retorna 14 chaves em cada planeta, mas a chave `residents` não deve ser exibida totalizando 13 colunas
    expect(await screen.findAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(13);
  });

  it('Verifique se a tabela tem uma linha para cada planeta retornado', async () => {
    await act(async () => {
      render(<App />);
    });
    // a requisição (mock) retorna 10 planetas, somando com mais um linha do header totalizando 11 linhas
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
  });
});

describe('2 - Filtre a tabela através de um texto, inserido num *campo de texto*, exibindo somente os planetas cujos nomes incluam o texto digitado', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  it('Renderize o campo de texto para o filtro de nomes', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR)).toBeInTheDocument();
  });

  it('Filtre os planetas que possuem a letra "o" no nome', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'o' } });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });

  it('Filtre planetas que possuem a letra "oo" no nome', async () => {
    await act(async () => {
      render(<App />);
    });
    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'oo' } });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
    const planetNames = ['Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });

  it('Faça vários filtros em sequência', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'o' } });
    let planetNames = [];
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
    planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }

    await act(async () => {
      const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      fireEvent.change(input, { target: { value: 'oo' } });
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
    planetNames = ['Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
    await act(async () => {
      const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      fireEvent.change(input, { target: { value: '' } });
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
    planetNames = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });
});

describe('3 - Crie um filtro para valores numéricos', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  it('Renderize o filtro de coluna', async () => {
    await act(async () => {
      render(<App />);
    });

    const column = await screen.findByTestId(COLUMN_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const foundColumnFilter = Array.from(column.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnFilter).toEqual(expect.arrayContaining(columns));
  });

  it('Renderize o filtro de comparação', async () => {
    await act(async () => {
      render(<App />);
    });

    const column = await screen.findByTestId(COMPARISON_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');
    const columns = ['maior que', 'igual a', 'menor que'];
    const foundComparisonFilter = Array.from(column.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundComparisonFilter).toEqual(expect.arrayContaining(columns));
  });

  it('Renderize o campo para o valor do filtro', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByTestId(VALUE_FILTER_SELECTOR)).toHaveProperty('nodeName', 'INPUT');
  });

  it('Renderize o botão para executar a filtragem', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByTestId(BUTTON_FILTER_SELECTOR)).toHaveProperty('nodeName', 'BUTTON');
  });

  it('Filtre utilizando a comparação "menor que"', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(await screen.findByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'surface_water' }});
    fireEvent.change(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId(VALUE_FILTER_SELECTOR), { target: { value: '40' }});
    fireEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(7);
  });

  it('Filtre utilizando a comparação "maior que"', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(await screen.findByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'diameter' }});
    fireEvent.change(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId(VALUE_FILTER_SELECTOR), { target: { value: '8900' }});
    fireEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
  });

  it('Filtre utilizando a comparação "igual a"', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(await screen.findByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'igual a' }});
    fireEvent.change(await screen.findByTestId(VALUE_FILTER_SELECTOR), { target: { value: '200000' }});
    fireEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(2);
  });
});
