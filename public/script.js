$(document).ready(function () {
    var title, location, text;
    $("#submit").click(function () {
        title = $("#title").val();
        location = $("#location").val();
        text = $("#text").val();
        $.post("/submit", { title: title, location: location, text: text }, function (data) {
            if (data === 'success') {
                $(".popup").toggleClass("show");
            }
        });
        
        $.ajax({
            url: '/imgupload',
            type: 'POST',
            data: new FormData($('#image')[0]), // The form with the file inputs.
            processData: false                          // Using FormData, no need to process data.
        }).done(function () {
            console.log("Success: Files sent!");
        }).fail(function () {
            console.log("An error occurred, the files couldn't be sent!");
        });
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