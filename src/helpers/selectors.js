export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  let daysArr = state.days.filter(currentDay => currentDay.name === day);

  if (daysArr === [] || !day || daysArr[0] === undefined) {
    return [];
  }
  const appointments = daysArr[0].appointments;

  const appointmentsArr = [];

  // if items in array id matches appointment push into appointmentsArr
  for (let appointment of Object.values(state.appointments)) {
    if (appointments.includes(appointment.id)) {
      appointmentsArr.push(appointment);
    }
  }

  return appointmentsArr;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  for (let interviewer of Object.values(state.interviewers)) {
    if (interview.interviewer === interviewer.id) {
      return {student: interview.student, interviewer}
    }
  }
  
}

export function getInterviewersForDay(state, day) {

  let daysArr = state.days.filter(currentDay => currentDay.name === day);

  if (daysArr === [] || !day || daysArr[0] === undefined) {
    return [];
  }

  const interviewers = daysArr[0].interviewers;

  const interviewersArr = [];

 // if interviewers in days array matches interviewers id push into interviewersArr
  for (let interview of Object.values(state.interviewers)) {
    if (interviewers.includes(interview.id)) {
      interviewersArr.push(interview);
    }
  }

  return interviewersArr;
}
