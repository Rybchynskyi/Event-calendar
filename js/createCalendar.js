function createCalendar (monthNumber, prevDays, days) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[(monthNumber - 1)];

    // First row
    let firstRow =
        "<div class='col-md-4 col-sm-6 py-2 calendarBorder'>" +
        "<div class=\"\">\n" +
        "<table class=\"calendar\">\n" +
        "    <tr>\n" +
        "        <td class=\"monthContainer\" colspan=\"7\">\n" +
        "            <div class=\"calendarName text-start my-2\">" + monthName + "</div>\n" +
        "        </td>\n" +
        "    </tr>\n" +
        "    <tr class=\"weekDays\">\n" +
        "        <th>Sun</th>\n" +
        "        <th>Mon</th>\n" +
        "        <th>Tue</th>\n" +
        "        <th>Wed</th>\n" +
        "        <th>Thu</th>\n" +
        "        <th>Fri</th>\n" +
        "        <th>Sat</th>\n" +
        "    </tr>";

    // Second row
    let secondRowDays = "";
    for (let fd = (32 - prevDays); fd<=31; fd++) {
        secondRowDays += '<td class="inactive">'+ fd +'<div class="dotsContainer d-flex justify-content-center"></div></td>';
    };
    for (let d = 1; d <= (7 - prevDays); d++) {
        secondRowDays += '<td data-date="' + monthNumber + '-' + d + '">' + d + '<div class="dotsContainer d-flex justify-content-center"></div></td>';
    }
    let secondRow = "<tr>" + secondRowDays + "</tr>";

    //    other rows
    let otherRowDays = "";
    for (let od = (7-prevDays+1); od<=31; od=(od+7)) {
        otherRowDays += "<tr>";
        let daysEnd = 1;
        for (let i=0; i<7; i++)
            if ((od+i)<=days) {
                otherRowDays += '<td data-date="' + monthNumber + '-' + (od + i) + '">' + (od + i) + '<div class="dotsContainer d-flex justify-content-center">\n' +
                '</div></td>';
            }
            else {
                otherRowDays += '<td class="inactive">' + daysEnd + '<div class="dotsContainer d-flex justify-content-center"></div></td>';
                daysEnd++;
            }
        otherRowDays += "</tr>";
    }
    let otherRows = otherRowDays + '</table></div></div>';

    // document.getElementById('calendars').innerHTML = firstRow + secondRow + otherRows;
    let fullCalendar = firstRow + secondRow + otherRows;
    document.getElementById('calendars').insertAdjacentHTML("beforeEnd", fullCalendar);
}

