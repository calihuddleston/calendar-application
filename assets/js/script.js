let calendarDay = $('#currentDay');
const time = moment().format("dddd, MMM Do YYYY");

// inserts current date to calendar
calendarDay.text("Today is: " + time);
localStorage.getItem('schedule')


let schedulePlanner = JSON.parse(localStorage.getItem('schedule'));
renderHours();
// creates time blocks
function renderHours () {
    const container = $('.container');

    for (let i = 9; i <= 17; i++){
        let hourCol = $('<div class="row time-block">');
        const hourSlot = $('<textarea class="col-9 form-control">');
        const plannerHour = moment(i, 'H').format('h:00A');
        
        container.append(hourCol);
        hourCol.append(plannerHour, hourSlot);

        hourSlot
            .before('<div class="hour col pt-4"></div>')
            .after('<button class="col btn saveBtn">💾</button>');

        if(!!schedulePlanner[plannerHour]) 
            hourCol.children('textarea').val(schedulePlanner[time][plannerHour]);
        }
        checkTime();
    
    };
   
function checkTime () {
    let currentTime = moment().hour();
    
    $('.container').children().each(() => {
        let hour = parseInt($(this));

        if (hour < currentTime) {
            $(this).removeClass(['present', 'future']).addClass('past');
        } else if (hour === currentTime) {
            $(this).removeClass(['past', 'future']).addClass('present');
        } else {
            $(this).removeClass(['past', 'present']).addClass('future');
        }
    })
}
    
$('button').on('click', function (e) {
    e.preventDefault();
    $('textarea').each(() => {
       localStorage.setItem('schedule', JSON.stringify($('textarea').val()));
    });
  })


