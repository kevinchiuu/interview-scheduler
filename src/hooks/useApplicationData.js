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

  // const findDay = (days, dayToUpdate) => {
  //   return days.reduce((acc, day, index) => {
  //       acc.push(day)
  //       acc.push(index)
  //     }
  //   }, [])
  // }


  // const updateSpots = (state, day) => {

  //   //which day to update spots for
  //   const dayToUpdate = day || state.day;

  //   const dayObj = state.days.find(day => day.name === dayToUpdate)

  //   console.log("day obj ->", dayObj)

  //   // const [dayObj, dayObjIndex] = findDay(state.days, dayToUpdate)

  //   const dayObjIndex = state.days.findIndex(day => day.name === dayToUpdate)

  //   const listofApptIDs = dayObj.appointments;
  //   const spots = listofApptIDs.filter(apptID => !state.appointments[apptID].interview).length;

  //   const newDay = {...dayToUpdate, spots}
    
  //   const newDays = [...state.days];

  //   newDays[dayObjIndex] = newDay;

  //   return newDays
  // };

  // const updateSpots = (id, state) => {
    
  // }

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

    const getSpotsForDay = (day) => {
      return day.appointments.length - 
       day.appointments.reduce(
         (count, id) => (appointments[id].interview ? count + 1 : count), 0
       )
     }

    let newDays = state.days.map((day)=>{
      return day.appointments.includes(id) ? { ...day, spots: getSpotsForDay(day) } : day
    })
  

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({...prev, appointments, days: newDays}));
        // setState((prev) => {
        //   const newState = {...prev, appointments,  days}
        //   const newState1 = updateSpots(newState, state.day)

        //   return newState1
        // })
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev) => ({...prev, appointments, days: newDays}));
        // setState((prev) => {
        //   const newState = {...prev, appointments}
        //   const newState1 = updateSpots(newState, day)

        //   return newState1
        // })
      });

  };

  return { state, setDay, bookInterview, cancelInterview };

}