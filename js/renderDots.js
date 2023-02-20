export function renderDots(eventList) {
    for (let i=0; i<eventList.length; i++) {
        let particularTd = document.querySelector('[data-date="'+ eventList[i].date +'"]')
        let redDot = '<div class="dot redDot"></div>';
        let greenDot = '<div class="dot greenDot"></div>';
        let yellowDot = '<div class="dot yellowDot"></div>';
        let blueDot = '<div class="dot blueDot"></div>';

        function isRenderedDot (dotClass) {
            let dots = particularTd.children[0].children;
            let renderedDots = 0;
            if (dots.length >= 0) {
                for (let i=0; i<dots.length; i++) {
                    if (dots[i].classList[1] === dotClass) {
                        renderedDots++;
                    }
                }
            }
            return renderedDots;
        }

        if (eventList[i].category === 1) {
            if (isRenderedDot('redDot') === 0) {
                particularTd.lastChild.insertAdjacentHTML("afterbegin", redDot);
            }
        }
        else if (eventList[i].category === 2) {
            if (isRenderedDot('greenDot') === 0) {
                particularTd.lastChild.insertAdjacentHTML("afterbegin", greenDot);
            }
        }
        else if (eventList[i].category === 3) {
            if (isRenderedDot('yellowDot') === 0) {
                particularTd.lastChild.insertAdjacentHTML("afterbegin", yellowDot);
            }
        }
        else if (eventList[i].category === 4) {
            if (isRenderedDot('blueDot') === 0) {
                particularTd.lastChild.insertAdjacentHTML("afterbegin", blueDot);
            }
        }
    }
}