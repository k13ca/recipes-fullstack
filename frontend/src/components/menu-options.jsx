import React, { useContext } from "react";
import { DataContext } from "../contexts/data-context";
import { filterOption } from "../constants/const";

export default function MenuOptions({ optionsHeader, options }) {
  const { setFilters, filters } = useContext(DataContext);

  const filterKeyMap = {
    [filterOption.CUISINE]: "cuisine",
    [filterOption.DIFFICULTY]: "difficulty",
    [filterOption.MEAL_TYPES]: "meal_type",
  };

  function handleFiltersChange(optionsHeader, option) {
    console.log(optionsHeader);
    const key = filterKeyMap[optionsHeader];

    setFilters((prev) => {
      const currentOptions = prev[key];

      if (currentOptions.includes(option)) {
        return {
          ...prev,
          [key]: currentOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [key]: [...currentOptions, option],
        };
      }
    });
  }
  return (
    <fieldset className="menu-options">
      <legend className="menu-options-header">
        <h4>{optionsHeader}</h4>
      </legend>
      {options.map((option, index) => (
        <div key={index} className="menu-options-options">
          <input
            checked={filters[filterKeyMap[optionsHeader]].includes(option)}
            type="checkbox"
            name={optionsHeader}
            value={option}
            onChange={() => handleFiltersChange(optionsHeader, option)}
          />
          <label htmlFor={option}>
            <h3>{option}</h3>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
