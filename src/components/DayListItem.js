import React from "react";
import "components/DayListItem.scss";

const classnames = require('classnames');

export default function DayListItem(props) {

  const dayListClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      className={dayListClass} 
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light"> {formatSpots(props.spots)} </h3>
    </li>
    
  );
}

const formatSpots = (spots) => {
  if (spots === 1) {
    return spots + " spot remaining";
  }

  if (spots > 1) {
    return spots + " spots remaining";
  }

  if (!spots) {
    return "no spots remaining";
  }
};