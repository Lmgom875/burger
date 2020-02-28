
//! Calling the function went the file is load
$(function () {
    //! Button eat click event
    $(".eat-burger").on("click", function (event) {
        var id = $(this).data("id");
        //!Send the put request
        $.ajax("/api/burgers/" + id, {
            type: "PUT"
        }).then(
            function () {
                //! Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //! Button sumit click event
    $(".create-form").on("submit", function (event) {
        //! Make sure to preventDefault on a submit event.
        event.preventDefault();
        //! newBurger variable with textbox string/ devoured 0 for default
        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: 0
        };
        //! Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                //! Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //! Button delete event
    $(".delete-burger").on("click", function (event) {
        //! Variable with the ID number
        var id = $(this).data("id");
        //! Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                //! Reload the page to get the updated list
                location.reload();
            }
        );
    });

})



