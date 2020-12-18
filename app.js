$(document).ready(function(){
    $("#buttonSearch").click(() => { 
        searchDataBase();
    })
});

function searchDataBase(){
    $("#divResponse").empty();
    let inputTitle = $("#searchTitle").val();
    if(inputTitle == ""){
        $("#divResponse").append("<h2>Kriterijum pretrage mora biti unijet.</h2>");
        return;
    }
    let inputType = $("#selectType").val();
    let inputYear = $("#searchYear").val();
    $.ajax({
        type: "GET",
        url: "http://www.omdbapi.com/?apikey=c47d341&t="+inputTitle+"&type="+inputType+"&y="+inputYear,
        success: (response) => {
            if(response.Response == "False"){
            $("#divResponse").append("<h2>Film/Serija nije pronadjena.</h2>");
            return; 
            }
            if(response.Poster == "N/A"){
                $("#divResponse").append("<img id='poster' class src='https://www.sjelectronics.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/o/no-image-available_147.jpg'>");
            }else{
                $("#divResponse").append("<img id='poster' class src=" + response.Poster + ">");
            }
            $("#divResponse").append("<h2>" + response.Title + "</h2>");
            $("#divResponse").append("<p><b>Godina:</b> " + response.Year + "</p>");
            $("#divResponse").append("<p><b>Datum objavljivanja:</b> " + response.Released + "</p>");
            $("#divResponse").append("<p><b>Trajanje:</b> " + response.Runtime + "</p>");
            $("#divResponse").append("<p><b>Režiser:</b> " + response.Director + "</p>");
            $("#divResponse").append("<p><b>Glumci:</b> " + response.Actors + "</p>");
            $("#divResponse").append("<p><b>Radnja:</b> " + response.Plot + "</p>");
            if(response.totalSeasons != undefined){
                $("#divResponse").append("<p><b>Broj sezona: </b>" + response.totalSeasons + "</p>");
            }
            if(response.Ratings.length > 0){
                $("#divResponse").append("<p><b>Ocjene gledalaca:</b></p>");
                for(let i = 0; i < response.Ratings.length; i++){
                    $("#divResponse").append("<p>Izvor "+(i+1)+" - <i>" +response.Ratings[i].Source + "</i> sa ocjenom " + response.Ratings[i].Value + "</p>" );
                }
            }
        }   
    });
}


