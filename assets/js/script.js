let calendarDay = $('#currentDay');
const time = moment().format("dddd, MMM Do YYYY");
const container = $('.container');

// inserts current date to calendar
calendarDay.text("Today is: " + time);

renderHours();

// creates time blocks
function renderHours () {
    var scheduledItems = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
    for (let i = 9; i <= 17; i++){
        let hourCol = $(`<div data-hour=${i} class="row time-block">`);
        const hourSlot = $(`<textarea id=${i} class="col-9 form-control">`);
        const plannerHour = moment(i, 'H').format('h:00A');
        
        container.append(hourCol);
        hourCol.append(plannerHour, hourSlot);

        hourSlot
            .before('<div class="hour col pt-4"></div>')
            .after('<button class="col btn saveBtn">💾</button>');

        // taking data in local storage and entering it into the text boxes it belongs to 
        hourSlot.value = scheduledItems[toString(i)]


        checkTime();
        
    }
};

// create class for past, present, future based on current time
function checkTime () {
    let currentTime = moment().hour();
    let hour = $('.container').children();
    hour.each(() => {
        if (hour < currentTime) {
            $('textarea').removeClass(['present', 'future']).addClass('past');
        } else if (hour === currentTime) {
            $('textarea').removeClass(['past', 'future']).addClass('present');
        } else {
            $('textarea').removeClass(['past', 'present']).addClass('future');
       }
  })
}

// save textarea text to local storage when the save button is clicked
$('button').on('click', function (e) {
    e.preventDefault();
    var text = $(this).siblings()[1].value;
    var currentHour = $(this).siblings()[1]
    // console.log(currentHour)

    var scheduledItems = JSON.parse(localStorage.getItem("dailySchedule") || "{}"); //looking for 'dailySchedule' if not there returns empty object
    scheduledItems[currentHour] = text;
    localStorage.setItem('dailySchedule', JSON.stringify(scheduledItems));
  })


