$(document).ready(function () {
    $("#submit").click(function () {      
        // $.post("/submit", { title: title, location: location, text: text }, function (data) {
        //     if (data === 'success') {
        //         $(".popup").toggleClass("show");
        //     }
        // });

        'use strict'
        let aFile = new FormData();
        aFile.append('test', document.querySelector('#image').files[0]);
        aFile.append("title", $("#title").val());
        aFile.append("location", $("#location").val());
        aFile.append("text", $("#text").val());

        let sendFile = new XMLHttpRequest();
        sendFile.open('POST', '/submit', 1);
        sendFile.send(aFile);
        sendFile.onreadystatechange = function (data) {
            console.log(data);
            if (sendFile.readyState === 4) {
                if (sendFile.status === 200) {
                    $(".popup").toggleClass("show");
                    //alert("success img uploaded");
                } else {
                    alert('Error: ' + sendFile.status);
                }
            };
        }



    });

    $("#newPost").click(function () {
        $(".popup").addClass("show");
    });

    $(document).click(function (e) {
        if (!e.target.classList.contains('popup') && e.target.id != 'newPost' && e.target.id != 'title' && e.target.id != 'location' && e.target.id != 'image' && e.target.id != 'text' && e.target.id != 'submit') {
            $(".popup").removeClass("show");
        }
    });

});