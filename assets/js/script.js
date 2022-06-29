let calendarDay = $('#currentDay');
const container = $('.container');
const localStorage = window.localStorage;
const time = moment();

// inserts current date to calendar
calendarDay.text("Today is: " + time.format("dddd, MMM Do YYYY"));

