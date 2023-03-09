import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import '../App.css';

export default function TablePlanets() {
  const {
    planets,
    ordenaDados,
  } = useContext(planetsContext);

  return (
    <table>
      <thead>
        <tr>
          {
            planets[0] && Object.keys(planets[0])
              .filter((item) => item !== 'created'
                && item !== 'edited' && item !== 'url')
              .map((title, index) => (
                <th key={ `${title}_${index}` } className="tableHeader">{title}</th>
              ))
          }
        </tr>
      </thead>
      <tbody className="fullTable">
        {ordenaDados()
          .map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td className="filmsRow"><a href={ planet.films }>{planet.films}</a></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
