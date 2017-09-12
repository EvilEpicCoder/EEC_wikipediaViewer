//Main js Wikipedia Viewer
var countryCode;
var responseJson;
var stupidRandom;
var myToogle;
$(document).ready(function(){

stupidRandom=Math.floor(Math.random() * (9999999 - 0)) + 0;
	getLocation();
	$(".btn").click(function(){
		if($("#search").val()<=3){
			var clear=$("#search").val();
			statusReport(clear);
			myToogle=setInterval(function(){ getRandomWiki();},5000);
			$(".btn").addClass("disabled");
		}else{

			var clear=$("#search").val();
			$("body").addClass("collapsed");
			$("h1").addClass("collapsed");
			$("h2").addClass("collapsed");
			statusReport(clear);
			getSearchWiki();
			myToogle=setInterval(function(){ getRandomWiki();},5000);
			$(".btn").addClass("disabled");
			//getSearchWiki
		}

	});
});
function getLocation(){
	$.getJSON("https://freegeoip.net/json/",function(data,status,xhr){
					//globalCityCountry=data.city+","+data.country_name;
					countryCode=data.country_code;//http://freegeoip.net/json/
					statusReport(countryCode);
					statusReport(status);});
}
function getRandomWiki(){
	stupidRandom=Math.floor(Math.random() * (9999999 - 0)) + 0;
	if(stupidRandom==undefined){
	stupidRandom=Math.floor(Math.random() * (9999999 - 0)) + 0;
	}

	//console.log(stupidRandom);
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&pageids="+stupidRandom+"&prop=info|extracts&inprop=url&exintro&callback=?",function(data,status,xhr){
					//responseJson=data.query.pages.stupidRandom;
					//console.log(data.query.pages[stupidRandom].extract);
						buildRandomList(data.query.pages[stupidRandom]);
						statusReport(responseJson);
						statusReport(status);
					});
}

function getSearchWiki(){
var searchText=$("#search").val();
$("#display-result").html("");
//$.getJSON("https://wikipedia.org/w/api.php?action=query&list=search&srsearch=morelike:Odessa&srlimit=10&srprop=size&formatversion=2",function(data,status,xhr){
				//globalCityCountry=data.city+","+data.country_name;
				//http://freegeoip.net/json/
$.getJSON("https://wikipedia.org/w/api.php?action=query&format=json&prop=links&list=search&utf8=1&srsearch="+searchText+"&srlimit=10&callback=?",function(data,status,xhr){
				responseJson=data.query.search;
				buildSearchableList(data.query.search);
				statusReport(responseJson);
				statusReport(status);});

}
function buildRandomList(random){
	if(random.extract.lenght<=50){
		getRandomWiki();
	}else{
		$("#display-result").append('<div class="section-text">'+'<a href="http://en.wikipedia.org/?curid='+stupidRandom+'">&nbsp'+"&nbsp<span style='color:black'>"+random.title+"</span>&nbsp"+random.extract+"</a>"+"</div>");
	}
	clearInterval(myToogle);
	$(".btn").removeClass("disabled");
	//console.log(random);
}
function buildSearchableList(total){

	for(var i=0; i<=total.length-1;i++){
		//console.log(responseJson[i].title);

		$("#display-result").append('<div class="section-text">'+'<a href="http://en.wikipedia.org/?curid='+total[i].pageid+'">&nbsp'+"&nbsp<span style='color:black'>"+total[i].title+"</span>&nbsp"+total[i].snippet+"</a>"+"</div>");

	}
	clearInterval(myToogle);
	$(".btn").removeClass("disabled");
}
function statusReport(statusData){
	console.log(statusData);
}
