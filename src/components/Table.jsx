import React, { useContext } from 'react';
import { HiSearch } from 'react-icons/hi';
import planetsContext from '../context/planetsContext';
import FilteredRefs from './FilteredRefs';
import TablePlanets from './TablePlanets';

import './Table.css';
import WelcomePage from './WelcomePage';
import Operator from './Operator';

export default function Table() {
  const {
    usedFilters,
    filterdOptions,
    setUsedFilters,
    planetInput,
    setPlanetInput,
    selected,
    setSelected,
    columnOptions,
    setColumnOptions,
    setOrder,
    order,
    setOrderAply,
  } = useContext(planetsContext);

  const sortOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <section className="fullPage">
      <WelcomePage />
      <section className="fullContainer">
        <div className="searchContainer">
          <input
            type="text"
            className="inputFilter"
            data-testid="name-filter"
            id=""
            name="planetInput"
            value={ planetInput }
            onChange={ (event) => setPlanetInput(event.currentTarget.value) }
            placeholder="Filter by planet name"
          />
          <HiSearch
            className="searchIcon"
          />
        </div>
        <section className="secondFilter">
          <div className="leftFilter">
            <div className="inputBox">
              <label htmlFor="column">
                Coluna
              </label>
              <select
                data-testid="column-filter"
                value={ selected.column }
                onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
              >
                {
                  columnOptions.filter(filterdOptions).map((opcao) => (
                    <option key={ opcao } value={ opcao }>
                      {opcao}
                    </option>
                  ))
                }
              </select>
            </div>
            <Operator />
            <div className="inputBox last">
              <input
                type="number"
                id="valor"
                data-testid="value-filter"
                value={ selected.value }
                placeholder="Valor"
                onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
                onKeyDown={ (e) => {
                  if (e.key === 'Enter') {
                    setUsedFilters([...usedFilters, selected]);
                    setColumnOptions(columnOptions.filter((el) => el !== selected.column));
                    setSelected({
                      ...selected,
                      column: columnOptions[0],
                    });
                  }
                } }
              />
              <button
                type="button"
                data-testid="button-filter"
                onClick={ () => {
                  setUsedFilters([...usedFilters, selected]);
                  setColumnOptions(columnOptions.filter((el) => el !== selected.column));
                  setSelected({
                    ...selected,
                    column: columnOptions[0],
                  });
                } }
              >
                Filtrar
              </button>
            </div>
          </div>
          <div className="rightFilter">
            <select
              data-testid="column-sort"
              onChange={ ({ target }) => {
                setOrder({ ...order, column: target.value });
              } }
            >
              {
                sortOptions.map((opcao) => (
                  <option key={ opcao } value={ opcao }>
                    {opcao}
                  </option>
                ))
              }
            </select>
            <label>
              <input
                type="radio"
                name="orderDirection"
                value="ASC"
                data-testid="column-sort-input-asc"
                checked={ order.sort === 'ASC' }
                onChange={ ({ target }) => {
                  setOrder({ ...order, sort: target.value });
                } }
              />
              Crescente
            </label>
            <label>
              <input
                type="radio"
                name="orderDirection"
                value="DESC"
                data-testid="column-sort-input-desc"
                checked={ order.sort === 'DESC' }
                onChange={ ({ target }) => {
                  setOrder({ ...order, sort: target.value });
                } }
              />
              Decrescente
            </label>
            <button
              type="button"
              data-testid="column-sort-button"
              onClick={ () => setOrderAply(order) }
            >
              Ordenar
            </button>
            <div>
              <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ () => {
                  setUsedFilters([]);
                  setColumnOptions([
                    'population',
                    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
                } }
              >
                Remover filtros

              </button>
            </div>
          </div>
        </section>
        <FilteredRefs />
        <TablePlanets />
      </section>
    </section>
  );
}
