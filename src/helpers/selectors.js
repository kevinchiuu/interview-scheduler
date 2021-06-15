export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  let filterDays = state.days.filter(currentDay => currentDay.name === day);

  if (filterDays === [] || !day || filterDays[0] === undefined) {
    return [];
  }
  const appointments = filterDays[0].appointments;

  const appointmentsArr = [];

  // if items in array id matches appointment push into appointmentsArray
  for (let appointment of Object.values(state.appointments)) {
    if (appointments.includes(appointment.id)) {
      appointmentsArr.push(appointment);
    }
  }

  return appointmentsArr;
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  for (let interviewer of Object.values(state.interviewers)) {
    if (interview.interviewer === interviewer.id) {
      return {student: interview.student, interviewer}
    }
  }
  
}