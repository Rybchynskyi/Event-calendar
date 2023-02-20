export function renderEventsInDate (data, eventList, clickedDate, monthNames) {
    // delete previous list in slider
    let elements = document.getElementById('sliderScroll');
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }

    for (let i=0; i<data.length; i++) {
        if(eventList[i].date === clickedDate) {

            // add 0 in dateformats
            function addLeadZero(val) {
                if (+val < 10) return '0' + val;
                return val;
            }

            // get date, hour and mins for html datetime format
            let eventDate = new Date(eventList[i].datetime);
            let normalHour = addLeadZero(eventDate.getHours());
            let normalMin = addLeadZero(eventDate.getMinutes());
            let dateTime = eventList[i].datetime;

            // get date with month
            let normalDate = eventDate.getDate() + " " + monthNames[eventDate.getMonth()];

            // get event tag and date colour
            let eventColourSlider;

            let eventTag;

            if (eventList[i].category === 1) {
                eventColourSlider = "eventDateRed";
                eventTag =
                    '<div id="eventTag" class="eventTag red" data-category="'+ eventList[i].category +'">\n' +
                    'Meeting with an expert\n' +
                    '</div>\n'
            }
            else if (eventList[i].category === 2) {
                eventColourSlider = "eventDateGreen";
                eventTag =
                    '<div id="eventTag" class="eventTag green" data-category="'+ eventList[i].category +'">\n' +
                    'Question-answer\n' +
                    '</div>\n'
            }
            else if (eventList[i].category === 3) {
                eventColourSlider = "eventDateYellow";
                eventTag =
                    '<div id="eventTag" class="eventTag yellow" data-category="'+ eventList[i].category +'">\n' +
                    'Conference\n' +
                    '</div>\n'
            }
            else if (eventList[i].category === 4) {
                eventColourSlider = "eventDateBlue";
                eventTag =
                    '<div id="eventTag" class="eventTag blue" data-category="'+ eventList[i].category +'">\n' +
                    'Webinar\n' +
                    '</div>\n'
            }

            // render block with event for paste to html
            let newEvent = '<div class="d-flex justify-content-between event">\n' +
                '                <div id="eventName" class="eventName">\n' +
                eventList[i].name +
                '                </div>\n' +
                '                <button class="ms-2 eventEditButton" data-event_id="' + eventList[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal"></button>\n' +
                '            </div>\n' +
                '            <div id="eventDescr" class="eventDescr mt-2">\n' +
                eventList[i].descr +
                '            </div>\n' +
                '            <div id="eventPlace" class="eventPlace mt-2">\n' +
                eventList[i].place +
                '            </div>\n' +
                '            <div class="d-flex justify-content-between  my-2">\n' +
                '                <div class="eventTimeSlider '+ eventColourSlider +'" data-datetime = "' + dateTime + '">\n' +
                normalDate + ", " + normalHour + ":" + normalMin +
                '                </div>\n' +
                eventTag +
                '            </div>' +
                '               <hr>'

            // paste block
            document.getElementById('sliderScroll').insertAdjacentHTML("afterbegin", newEvent);

            // prepare to edit popup
            let editButtons = document.getElementsByClassName("eventEditButton");
            for (let i=0; i<editButtons.length; i++) {
                editButtons[i].addEventListener("click", e => {
                    let clickedEvent;
                    for (let k=0; k<eventList.length; k++) {
                        if (eventList[k].id == e.target.dataset.event_id) {
                            clickedEvent = eventList[k];
                        }
                    }

                    let inputs = document.getElementById('editModal').getElementsByTagName('input');
                    let textarea = document.getElementById('editModal').getElementsByTagName('textarea');
                    inputs[0].value = clickedEvent.name;
                    textarea[0].value = clickedEvent.descr;
                    inputs[1].value = clickedEvent.place;

                    let event = new Date(clickedEvent.datetime);
                    inputs[2].value = (new Date(event.getTime() - event.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
                    inputs[3].value = clickedEvent.id;

                    // remove beSure block if it exist
                    let bSureClasslist = document.getElementById('beSureBlock').classList;
                    if (!bSureClasslist.contains('d-none')) {
                        bSureClasslist.add('d-none');
                    }

                    // get and render category in edit popup
                    let categoryArr = document.getElementById('editModal').getElementsByTagName('option');

                    switch(clickedEvent.category) {
                        case '1':
                            categoryArr[0].selected = true;
                            break;
                        case '2':
                            categoryArr[1].selected = true;
                            break;
                        case '3':
                            categoryArr[2].selected = true;
                            break;
                        case '4':
                            categoryArr[3].selected = true;
                            break;
                        default:
                            categoryArr[0].selected = true;
                            break;
                    }
                })
            }
        }
    }
}