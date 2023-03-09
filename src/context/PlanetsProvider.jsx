import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetInput, setPlanetInput] = useState('');
  const [usedFilters, setUsedFilters] = useState([]);

  const getAPI = async () => {
    const URL = 'https://swapi.dev/api/planets';
    const response = await fetch(URL);
    const data = await response.json();
    const { results } = data;
    results.map((planet) => delete planet.residents);
    setPlanets(results);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
  });

  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // estado para controlar a ordenação
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const [orderAply, setOrderAply] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = () => {
    const filteredName = planets.filter((el) => (
      el.name.toLowerCase().includes(planetInput.toLowerCase())
    ));
    const filteredNameNConditions = filteredName.filter((planet) => {
      const filterResults = usedFilters.map(({ column, condition, value }) => {
        switch (condition) {
        case 'maior que':
          return (Number(planet[column]) > Number(value));
        case 'menor que':
          return (Number(planet[column]) < Number(value));
        case 'igual a':
          return (planet[column] === value.toUpperCase());
        default:
          return true;
        }
      });
      return filterResults.every((el) => el);
    });
    return filteredNameNConditions;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterdOptions = (opcao) => !usedFilters.find((el) => el.column === opcao);

  const magicN = 1;

  const ordenaDados = () => {
    const { column, sort } = orderAply;

    if (Object.keys(orderAply).length === 0) {
      return handleFilter();
    }

    const sorting = (a, b) => {
      if (a[column] === 'unknown') return magicN;
      if (b[column] === 'unknown') return -magicN;
      return (sort === 'ASC' ? a[column] - b[column] : b[column] - a[column]) * magicN;
    };

    return handleFilter().sort(sorting);
  };

  const exportData = useMemo(
    () => ({
      planets,
      usedFilters,
      setPlanets,
      handleFilter,
      setUsedFilters,
      filterdOptions,
      planetInput,
      setPlanetInput,
      selected,
      setSelected,
      columnOptions,
      order,
      ordenaDados,
      setOrder,
      setColumnOptions,
      setOrderAply,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      planets,
      usedFilters,
      filterdOptions,
      planetInput,
      setPlanetInput,
      handleFilter,
      setPlanets,
      setUsedFilters,
      selected,
      setSelected,
      order,
      setOrder,
      columnOptions,
      setColumnOptions,
      setOrderAply,
    ],
  );

  return (
    <planetsContext.Provider value={ exportData }>
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };
