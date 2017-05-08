
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // GET FORM INPUT AND LOG IT FOR DEBUGGING
    var street = $("#street").val();
    var city = $("#city").val();
    console.log(street+", "+city);

    // GET AND ADD BG IMAGE
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+street+', '+city+'">');

    //GET AND ADD NYT ARTICLES
    const nytKey = '923cd967e8564499ad613f4d55375c68';
    var nytData = {
                  'api-key': nytKey,
                  'fq': city
                };
    // var nytRespData = $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json", nytData);
    $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json", nytData,function (data){
        console.log(data);
        data.response.docs.forEach(function(doc){
            $nytElem.append('<li class="article"><a href="'+doc.web_url+'">'+doc.headline.main+'</a><p>'+doc.snippet+'</p></li>')
        })
    }).error(function(evt){
        $nytHeaderElem.html("New York Times Articles Could Not Be Loaded") 
    });

    return false;
};

$('#form-container').submit(loadData);
