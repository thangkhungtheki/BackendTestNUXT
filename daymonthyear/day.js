// function getWeeksStartAndEndInMonth(month, year) {
//     let weeks = [],
//         firstDate = new Date(year, month, 1),
//         lastDate = new Date(year, month + 1, 0),
//         numDays = lastDate.getDate();

//     let start = 1;
//     let end = 7 - firstDate.getDay();
//     if (start === 'monday') {
//         if (firstDate.getDay() === 0) {
//             end = 1;
//         } else {
//             end = 7 - firstDate.getDay() + 1;
//         }
//     }
//     while (start <= numDays) {
//         weeks.push({start: start, end: end});
//         start = end + 1;
//         end = end + 7;
//         end = start === 1 && end === 8 ? 1 : end;
//         if (end > numDays) {
//             end = numDays;
//         }
//     }
//     console.log(weeks)
//     return weeks;
// }
// // getWeeksStartAndEndInMonth(6-1,2024)

// function endFirstWeek(firstDate, firstDay) {
//     if (! firstDay) {
//         return 7 - firstDate.getDay();
//     }
//     if (firstDate.getDay() < firstDay) {
//         return firstDay - firstDate.getDay();
//     } else {
//         return 7 - firstDate.getDay() + firstDay;
//     }
// }

// function getWeeksStartAndEndInMonth(month, year) {
//     let weeks = [],
//         firstDate = new Date(year, month, 1),
//         lastDate = new Date(year, month + 1, 0),
//         numDays = lastDate.getDate();

//     let start = 1;
//     let end = endFirstWeek(firstDate, 2);
//     while (start <= numDays) {
//         weeks.push({start: start, end: end});
//         start = end + 1;
//         end = end + 7;
//         end = start === 1 && end === 8 ? 1 : end;
//         if (end > numDays) {
//             end = numDays;
//         }
//     }
//     console.log(weeks)
//     return weeks;
// }

// getWeeksStartAndEndInMonth(12-1,2024)
function getWeeksStartAndEndInMonth(month, year, _start) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],
        d = new Date();
    console.log("The current month is " + monthNames[d.getMonth()]);
    let weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();
    var c = Date()
    let start = 1;
    let end = 7 - firstDate.getDay();
    if (_start == 'monday') {
        if (firstDate.getDay() === 0) {
            end = 1;
        } else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        var businessWeekEnd = end-2
        if(businessWeekEnd > 0){
            if(businessWeekEnd > start){
                weeks.push({start: start, end: businessWeekEnd});
            }
            else{
                //Check for last day else end date is within 5 days of the week.
                weeks.push({start: start, end: end});
            }
        }
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }

    weeks.forEach(week => {
        var _s = parseInt(week.start, 10)+1,
            _e = parseInt(week.end,10)+1;
        console.log(new Date(year, month, _s).toJSON().slice(0,10).split('-').reverse().join('/') + " - " + new Date(year, month, _e).toJSON().slice(0,10).split('-').reverse().join('/'));
        console.log(((_e-_s)+1)*8)
    });
    return weeks;
}
console.table(getWeeksStartAndEndInMonth(8-1, 2024, 'monday'));