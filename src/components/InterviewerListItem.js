import React from 'react';
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}