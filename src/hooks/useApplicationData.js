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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
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

    const getSpotsForDay = (day) => {
      return day.appointments.length - 
       day.appointments.reduce(
         (count, id) => (appointments[id].interview ? count + 1 : count), 0
       )
     }

    let newDays = state.days.map((day)=>{
      return day.appointments.includes(id) ? { ...day, spots: getSpotsForDay(day) } : day
    })
  

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({...prev, appointments, days: newDays}));
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

    // setState({...state, appointments});

    const getSpotsForDay = (day) => {
      return day.appointments.length - 
       day.appointments.reduce(
         (count, id) => (appointments[id].interview ? count + 1 : count), 0
       )
     }

    let newDays = state.days.map((day)=>{
      return day.appointments.includes(id) ? {...day, spots: getSpotsForDay(day) } : day
    })

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({...prev, appointments, days: newDays}));
      });

  };

  return { state, setDay, bookInterview, cancelInterview };

}