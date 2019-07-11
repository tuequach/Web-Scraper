$.getJSON('/articles' , function (data) {
    for (var i=0; i< data.length; i++) {
        $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//Whenever the p tag is clicked and making sure the notes are being empty from the note section
$(document).on('click', 'p', function() {
    $('#notes').empty(); 
    var thisId = $(this).attr('data-id');

    //creating ajax call for the Article
$.ajax({
    method: "GET",
    url: "/articles/" + thisId
})

//adding note information to the page
.then(function(data) {
    console.log(data);
    //title of the article
    $('#notes').append("<h2>" + data.title + "</h2");
    //input for new title
    $('#notes').append("<input id='titleinput' name ='title' >");
    //add new note body 
    $('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
    //creating button for submitting new note with id of the article and saving it
    $('#notes').append("<button data=id='" + data._id + "' id='savenote'>Save Note</button>");
})
})