import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

export default function FilteredRefs() {
  const {
    usedFilters,
    setUsedFilters,
  } = useContext(planetsContext);

  return (
    <div>
      {usedFilters.map((filter, index) => (
        <div
          key={ index }
          data-testid="filter"
        >
          <span>
            {
              `${filter.column}
               ${filter.condition}
               ${filter.value}`
            }
          </span>
          <button
            type="button"
            onClick={ () => {
              const clone = [...usedFilters];
              clone.splice(index, 1);
              setUsedFilters(clone);
            } }
          >
            X
          </button>
        </div>

      ))}
    </div>
  );
}
