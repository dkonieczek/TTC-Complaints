$(document).ready(function () {

    fetch('/posts')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.forEach(function (post) {
                console.log(post);
                let item = `
                    <div class="item">
                        <div class="item-top">
                            <div class="title"><span>${post.title}</span></div>
                            <div class="location"><span>${post.location}</span></div>
                        </div>
                        <div class="item-bottom">
                            <div class="description">
                                <span>${post.text}</span>
                            </div>

                        </div>
                    </div>`;

                //$('.main-content').prepend(item);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

    $("#submit").click(function () {
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

    $(".submit-btn").click(function () {
        $(".popup-wrapper").removeClass("hide");
        $(".blur-wrapper").addClass("blur");
    });

    
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