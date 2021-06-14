export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  let filteredDays = state.days.filter(currentDay => currentDay.name === day);

  if (filteredDays === [] || !day || filteredDays[0] === undefined) {
    return [];
  }
  const appointments = filteredDays[0].appointments;

  const result = [];

  // if items in array id matches appointment push into result
  for (let appointment of Object.values(state.appointments)) {
    if (appointments.includes(appointment.id)) {
      result.push(appointment);
    }
  }

  return result;
}