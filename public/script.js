$(document).ready(function () {

    /** POST a new post */
    $("#submit").click(function () {
        'use strict'
        let aFile = new FormData();
        aFile.append('filename', document.querySelector('#image').files[0]);
        aFile.append("title", $("#title").val());
        aFile.append("location", $("#location").val());
        aFile.append("text", $("#text").val());

        let sendFile = new XMLHttpRequest();
        sendFile.open('POST', '/submit', 1);
        sendFile.send(aFile);
        sendFile.onreadystatechange = function (data) {
            if (sendFile.readyState === 4) {
                if (sendFile.status === 200) {
                    location.reload();
                } else {
                    console.log('Error: ' + sendFile.status);
                }
            };
        }
    });

    /** Display popup when 'Submit' button within header is clicked */
    $(".submit-btn").click(function () {
        $(".popup-wrapper").removeClass("hide");
        $(".blur-wrapper").addClass("blur");
    });

    /** Hide submit popup when clicked anywhere outside the popup */
    $(document).click(function (e) {
        if (e.target.id != 'newPost' && 
            e.target.id != 'title' && 
            e.target.id != 'location' && 
            e.target.id != 'image' && 
            e.target.id != 'text' && 
            e.target.id != 'submit' &&
            e.target.classList != 'submit-btn' &&
            e.target.classList != 'popup' &&
            e.target.classList != 'form-submit' && 
            e.target.classList != 'popup-name') {
                $(".popup-wrapper").addClass("hide");
                $(".blur-wrapper").removeClass("blur");
            }
    });
    
});