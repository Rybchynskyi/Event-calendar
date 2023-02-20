import {renderEventsInDate} from './eventsInDate.js';
import {renderDots} from './renderDots.js';
import {informer} from './informer.js';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

fetch('api')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // make eventList for working with them
        let eventList = data;

        const dateContainers = document.getElementsByClassName('dotsContainer');
        const dateCells = document.getElementsByTagName('td');

        renderDots(eventList);

        // show categories
        let filterButtons = document.getElementsByClassName('events');
        for (let fb=1; fb < filterButtons.length; fb++) {
            filterButtons[fb].addEventListener("click", e => {
                // make array emty
                eventList = [];

                // make dotsContainer empty
                for (let i = 0; i < dateContainers.length; i++) {
                    dateContainers[i].innerHTML = "";
                }

                // delete previous borders
                for (let c=0; c<filterButtons.length; c++) {
                    filterButtons[c].style.border = "1px solid transparent";
                }

                // defind button, set colour and make border
                let colour;
                switch (e.target.classList[1]) {
                    case ("red"):
                        colour = 1;
                        e.target.style.border = "1px solid #FF4E6B";
                        break;
                    case ("green"):
                        colour = 2;
                        e.target.style.border = "1px solid #00CC66";
                        break;
                    case ("yellow"):
                        colour = 3;
                        e.target.style.border = "1px solid #FFBB33";
                        break;
                    case ("blue"):
                        colour = 4;
                        e.target.style.border = "1px solid #4DB4FF";
                        break;
                }

                // fill dotsContainer by particular dots
                for (let i = 0; i < data.length; i++) {
                    if (data[i].category === colour) {
                        eventList.push(data[i])
                    }
                }
                renderDots(eventList);
            });
        }

        // show all events by pressing button
        filterButtons[0].addEventListener("click", () => {

            // reset previous borders
            for (let c=0; c<filterButtons.length; c++) {
                filterButtons[c].style.border = "1px solid transparent";
            }

            // make dotsContainer empty
            for (let i = 0; i < dateContainers.length; i++) {
                dateContainers[i].innerHTML = "";
            }

            eventList = data;
            renderDots(eventList);
        })


        // render slider and popup for editing event
        for (let i=0; i<dateCells.length; i++) {
            dateCells[i].addEventListener('click', e => {

                // add clicked date to data in slider
                let clickedDate = e.target.dataset.date;
                document.getElementById('slider').dataset.date = clickedDate;

                // render date for add popup
                let dateArr = clickedDate.split("-");
                document.getElementById('popupDate').innerText = dateArr[1] + " " + monthNames[dateArr[0]] + " at";
                document.getElementById('eventDate').value = dateArr[0] + "-" + dateArr[1];

                // show slider
                document.getElementById("slider").style.display = "block";
                document.getElementById("slider").style.height = "753px";

                // render events in modal window
                renderEventsInDate(data, eventList, clickedDate, monthNames);

                // // prepare to edit popup
                // let editButtons = document.getElementsByClassName("eventEditButton");
                // for (let i=0; i<editButtons.length; i++) {
                //     editButtons[i].addEventListener("click", e => {
                //         let clickedEvent;
                //         for (let k=0; k<eventList.length; k++) {
                //             if (eventList[k].id == e.target.dataset.event_id) {
                //                 clickedEvent = eventList[k];
                //             }
                //         }
                //
                //         let inputs = document.getElementById('editModal').getElementsByTagName('input');
                //         let textarea = document.getElementById('editModal').getElementsByTagName('textarea');
                //         inputs[0].value = clickedEvent.name;
                //         textarea[0].value = clickedEvent.descr;
                //         inputs[1].value = clickedEvent.place;
                //
                //         let event = new Date(clickedEvent.datetime);
                //         inputs[2].value = (new Date(event.getTime() - event.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
                //         inputs[3].value = clickedEvent.id;
                //
                //         // remove beSure block if it exist
                //         let bSureClasslist = document.getElementById('beSureBlock').classList;
                //         if (!bSureClasslist.contains('d-none')) {
                //             bSureClasslist.add('d-none');
                //         }
                //
                //         // get and render category in edit popup
                //         let categoryArr = document.getElementById('editModal').getElementsByTagName('option');
                //
                //         switch(clickedEvent.category) {
                //             case '1':
                //                 categoryArr[0].selected = true;
                //                 break;
                //             case '2':
                //                 categoryArr[1].selected = true;
                //                 break;
                //             case '3':
                //                 categoryArr[2].selected = true;
                //                 break;
                //             case '4':
                //                 categoryArr[3].selected = true;
                //                 break;
                //             default:
                //                 categoryArr[0].selected = true;
                //                 break;
                //         }
                //     })
                // }
            })
        }

        // Add new event
        let form = document.getElementById('formAdd');
        form.addEventListener("submit", event =>{
            event.preventDefault();
            let formData = new FormData(form);
            let formDataObj = Object.fromEntries(formData);
            // console.log(formDataObj);
            let formDataJson = JSON.stringify(formDataObj);

            fetch('/api', {
                method: 'POST',
                body: formDataJson
            })
            .then((response) => {
                if(response.status === 200){
                    document.getElementById("addModalClose").click();
                    form.reset();
                    fetch('api')
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            // update dots
                            eventList = data;
                            renderDots(eventList);

                            // update list in slider
                            let clickedDate = document.getElementById('slider').dataset.date;
                            renderEventsInDate(data, eventList, clickedDate, monthNames);

                            // add informer
                            informer("#00CC66", "Creating was successfully")

                        })
                }
            })
        });

        // Edit event
        let editForm = document.getElementById('formEdit');
        editForm.addEventListener("submit", event =>{
            event.preventDefault();
            let formData = new FormData(editForm);
            let formDataObj = Object.fromEntries(formData);
            let formDataJson = JSON.stringify(formDataObj);

            fetch('/api', {
                method: 'PUT',
                body: formDataJson
            })
                .then((response) => {
                    if(response.status === 200){
                        editForm.reset();
                        document.getElementById("editModalClose").click();
                        fetch('api')
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then((data) => {
                                // update dots
                                eventList = data;
                                renderDots(eventList);

                                // update list in slider
                                let clickedDate = document.getElementById('slider').dataset.date;
                                renderEventsInDate(data, eventList, clickedDate, monthNames);

                                // add informer
                                informer("#00CC66", "Changing was successfully")

                            })
                    }
                });
        })

        // Delete event
        editForm = document.getElementById('formEdit');
        let deleteButton = document.getElementById('deleteButtonForSure');
        deleteButton.addEventListener("click", () =>{
            let deleteId = document.getElementById('eventId').value;
            fetch('/api', {
                method: 'DELETE',
                body: deleteId
            })
                .then((response) => {
                    if(response.status === 200){
                        document.getElementById("editModalClose").click();
                        editForm.reset();
                        fetch('api')
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then((data) => {
                                // update dots
                                eventList = data;
                                renderDots(eventList);

                                // update list in slider
                                let clickedDate = document.getElementById('slider').dataset.date;
                                renderEventsInDate(data, eventList, clickedDate, monthNames);

                                // add informer
                                informer("#00CC66", "Deleting was successfully")

                            })
                    }
                })
        });
    })

// close slider
document.getElementById("closeEvents").addEventListener("click", closeList)
function closeList(){
    document.getElementById("slider").style.height = "0px";
}

// make sure about deleting
document.getElementById('deleteButton').addEventListener("click", ()=>{
    //show besure block
    document.getElementById('beSureBlock').classList.remove('d-none');
});
document.getElementById('deleteButtonNoSure').addEventListener("click", ()=>{
    document.getElementById('beSureBlock').classList.add('d-none');
})







