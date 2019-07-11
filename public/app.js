$.getJSON('/articles' , function (data) {
    for (var i=0; i< data.length; i++) {
        $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//Whenever the p tag is clicked and making sure the notes are being empty from the note section
$(document).on('click', 'p', function() {
    $('#notes').empty(); 
    var thisId = $(this).attr('data-id');
