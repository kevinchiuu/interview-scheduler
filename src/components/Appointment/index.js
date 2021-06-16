import React from 'react';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) });

    // transition(SHOW);
    
  }

  const cancel = () => {
    // transition(CANCEL);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && <Confirm onClick={() => back()} />}

    </article>
  )
};