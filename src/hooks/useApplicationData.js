import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((response) => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }))
    })
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({...prev, appointments }))
      });

  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({...state, appointments});

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({...prev, appointments}))
      });

  };

  return { state, setDay, bookInterview, cancelInterview };

}