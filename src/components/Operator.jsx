import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import './Table.css';

export default function Operator() {
  const {
    selected,
    setSelected,
  } = useContext(planetsContext);

  return (
    <div className="inputBox">
      <label htmlFor="operador">
        Operador
      </label>
      <select
        id="operador"
        data-testid="comparison-filter"
        onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    </div>
  );
}
