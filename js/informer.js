function deleteInformer(){
    document.getElementById("informer").remove();
}

export function informer(bg, message){
    document.body.insertAdjacentHTML("afterbegin",
        "<div id=\"informer\" class=\"informer\">" + message + "</div>");
    document.getElementById("informer").style.background = bg;
}