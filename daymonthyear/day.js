

function getWeeksStartAndEndInMonth(month, year, _start) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ],
        d = new Date();
    console.log("The current month is " + monthNames[d.getMonth()]);
    let weeks = [],
        firstDate = new Date(year, month , 1),
        lastDate = new Date(year, month + 1 , 0),
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
        var businessWeekEnd = end
        if(businessWeekEnd > 0){
            if(businessWeekEnd > start){
                if((businessWeekEnd - start) === 6){
                    weeks.push({
                        2: start,
                        3: start + 1,
                        4: start + 2 ,
                        5: start + 3 , 
                        6: start + 4 ,
                        7: start + 5 ,
                        cn: businessWeekEnd 
                    })
                }else{
                    if(weeks.length === 0){
                        let step = businessWeekEnd - start
                        switch(step) {
                            case 0:
                            // code block
                            weeks.push({
                                // 2: 0,
                                // 3: 0,
                                // 4: 0,
                                // 5: 0,
                                // 6: 0,
                                // 7: 0,
                                cn: start,
                                })
                            break;
                            case 1:
                            // code block
                            weeks.push({
                                // 2: 0,
                                // 3: 0,
                                // 4: 0,
                                // 5: 0,
                                // 6: 0,
                                7: start,
                                cn: businessWeekEnd,
                                })
                            break;
                            case 2:
                            // code block
                            weeks.push({
                                // 2: 0,
                                // 3: 0,
                                // 4: 0,
                                // 5: 0,
                                6: start,
                                7: start + 1,
                                cn: businessWeekEnd ,
                            })
                                break;
                            case 3:
                            // code block
                            weeks.push({
                                // 2: 0,
                                // 3: 0,
                                // 4: 0,
                                5: start,
                                6: start + 1,
                                7: start + 2 ,
                                cn: businessWeekEnd
                                })
                            break;
                            case 4:
                            // code block
                            weeks.push({
                                // 2: 0,
                                // 3: 0,
                                4: start,
                                5: start + 1,
                                6: start + 2 ,
                                7: start + 3,
                                cn: businessWeekEnd
                                })
                            break;
                        
                            case 5:
                            // code block
                            weeks.push({
                                // 2: 0,
                                3: start,
                                4: start + 1,
                                5: start + 2 ,
                                6: start + 3,
                                7: start + 4,
                                cn: businessWeekEnd
                                })
                            break;
                            default:
                            console.log("loi gi đó")
                            
                        }
                    }else{
                        let step = businessWeekEnd - start
                        switch(step) {
                            case 0:
                            // code block
                            weeks.push({
                                2: start,
                                // 3: 0,
                                // 4: 0,
                                // 5: 0,
                                // 6: 0,
                                // 7: 0
                                })
                            break;
                            case 1:
                            // code block
                            weeks.push({
                                2: start,
                                3: businessWeekEnd,
                                // 4: 0,
                                // 5: 0,
                                // 6: 0,
                                // 7: 0
                                })
                            break;
                            case 2:
                            // code block
                            weeks.push({
                                2: start,
                                3: start + 1,
                                4: businessWeekEnd ,
                                // 5: 0,
                                // 6: 0,
                                // 7: 0
                            })
                                break;
                            case 3:
                            // code block
                            weeks.push({
                                2: start,
                                3: start + 1,
                                4: start + 2 ,
                                5: businessWeekEnd,
                                // 6: 0,
                                // 7: 0
                                })
                            break;
                            case 4:
                            // code block
                            weeks.push({
                                2: start,
                                3: start + 1,
                                4: start + 2 ,
                                5: start + 3,
                                6: businessWeekEnd,
                                // 7: 0
                                })
                            break;
                        
                            case 5:
                            // code block
                            weeks.push({
                                2: start,
                                3: start + 1,
                                4: start + 2 ,
                                5: start + 3,
                                6: start + 4,
                                7: businessWeekEnd
                                })
                            break;
                            default:
                            console.log("loi gi đó")
                            
                        }
                    }
                    
                }
                // weeks.push({start: start, end: businessWeekEnd});
            }
            else{
                //Check for last day else end date is within 5 days of the week.
                // weeks.push({start: start, end: end});
            }
        }
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }

    // weeks.forEach(week => {
    //     var _s = parseInt(week.start, 10)+1,
    //         _e = parseInt(week.end,10)+1;
    //     console.log(new Date(year, month, _s).toJSON().slice(0,10).split('-').reverse().join('/') + " - " + new Date(year, month, _e).toJSON().slice(0,10).split('-').reverse().join('/'));
    //     console.log(((_e-_s)+1)*8)
    // });
    return weeks;
}

console.log(getWeeksStartAndEndInMonth(8-1,2024, "monday"))
