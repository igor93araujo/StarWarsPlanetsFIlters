import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import App from '../App';
import mockData from './mockData.js';
const ROW_ROLE_SELECTOR = 'row';
const COLUMN_ROLE_SELECTOR = 'columnheader';
const INPUT_FILTER_NAME_SELECTOR = 'name-filter';
const COLUMN_FILTER_SELECTOR = 'column-filter';
const COMPARISON_FILTER_SELECTOR = 'comparison-filter';
const VALUE_FILTER_SELECTOR = 'value-filter';
const BUTTON_FILTER_SELECTOR = 'button-filter';
const DECREASE_BUTTON_SELECTOR = 'column-sorter-decrease';
const INCREASE_BUTTON_SELECTOR = 'column-sorter-increase';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockData,
  }));
})

describe('Testes do App', () => {
  it('Verifique se a tabela tem 13 colunas', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(await screen.findAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(13);
  });
  it('Verifique se a tabela tem uma linha para cada planeta retornado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
  });
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

  it('Existe um input de texto' ,()=> {
    render(<App />);
    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();
  })
  it('Existe um input de número' ,()=> {
    render(<App />);
    const input = screen.getByTestId('value-filter');
    expect(input).toBeInTheDocument();
  })
  it('Existe um select de colunas' ,()=> {
    render(<App />);
    const input = screen.getByTestId('column-filter');
    expect(input).toBeInTheDocument();
  })
  it('Existe um select de comparação' ,()=> {
    render(<App />);
    const input = screen.getByTestId('comparison-filter');
    expect(input).toBeInTheDocument();
  })
  it('Existe um botão de filtro' ,()=> {
    render(<App />);
    const input = screen.getByTestId('button-filter');
    expect(input).toBeInTheDocument();
  })
  it('Existe um botão de remover filtros' ,()=> {
    render(<App />);
    const input = screen.getByTestId('button-remove-filters');
    expect(input).toBeInTheDocument();
  })
  it('Existe um botão de filtrar' ,()=> {
    render(<App />);
    const input = screen.getByTestId('button-filter');
    expect(input).toBeInTheDocument();
  })
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

  // test('should sort data in ascending order', async() => {
  //   await act(async () => {
  //     render(<App />);
  //   });
     
  //   DECREASE_BUTTON_SELECTOR = screen.getByText(/decrescente/i);
  //   fireEvent.change(await screen.findByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'population' }});
  //   fireEvent.click(DECREASE_BUTTON_SELECTOR);

  //   const firstCell = await screen.getByRole('cell', {  name: /yavin iv/i})
  //   expect(await firstCell).toBe


  // });

});