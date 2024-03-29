"use strict";

const {
    ipcRenderer
} = require("electron");

let dl = (url) => {
    ipcRenderer.send("dl", url);
}

window.updateProgress = (value) => {

    value = ~~(value * 100);

    if (value >= 100) {
        $("#my_progress_bar").fadeOut("fast", function(){
            $(this).remove();
        });

        return;
    }

    if ($("#my_progress_bar").length < 1) {
        $("body").append(`<progress id="my_progress_bar" max="100" value="0">0%</progress>`);

        $("#my_progress_bar").css({
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            zIndex: 9999
        });
    }

    $("#my_progress_bar").attr("value", value);
    $("#my_progress_bar").text(`${value}%`);
};

onload = () => {
    $(".nav.navbar-nav").css("visibility", "hidden");
    $("footer .textmuted").css("visibility", "hidden");
    $(".list-inline").hide();
    $("aside").remove();
    $("nav").removeClass("navbar-dark").removeClass("bg-dark").addClass("navbar-light").css("background-color", "#f0f0f0");

    $("#searchOptionsButton").hide()
    $(document).on("click", "a.link", function(){

        dl($(this).data("uri"));

        return false;
    });
};