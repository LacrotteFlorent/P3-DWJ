










//Script Diaporama

function nextDiapo () {
    $('#sliderRow > div:visible').animate({marginLeft:"-3500"}, 800,"linear", function() {
        if(($(this).is('#sliderRow > div:last-child'))) {
            $('#sliderRow div:first-child').css('margin-left','3500px').show(function() {
                $(this).animate({marginLeft:"0px"},800,"linear");
            });
            $(this).hide();
        }
        else {
            $(this).next('div').css('margin-left','3500px').show(function() {
                $(this).animate({marginLeft:"0px"},800,"linear");
            });
            $(this).hide();
        }
    });
}

function prevDiapo () {
    $('#sliderRow > div:visible').animate({marginLeft:"-3500"}, 800,"linear", function() {
        if(($(this).is('#sliderRow > div:first-child'))) {
            $('#sliderRow div:last-child').css('margin-left','3500px').show(function() {
                $(this).animate({marginLeft:"0px"},800,"linear");
            });
            $(this).hide();
        }
        else {
            $(this).prev('div').css('margin-left','3500px').show(function() {
                $(this).animate({marginLeft:"0px"},800,"linear");
            });
            $(this).hide();
        }
    });
}

let intervalID;
function tempo() {
    intervalID = setInterval(nextDiapo,5000);
}

$(function() {
    tempo();
    $('#btnPrev').on('click', function() {prevDiapo(); console.log("clic precedent");});
    $('#btnPlay').on('click', function() {tempo(); console.log("clic play");});
    $('#btnPause').on('click', function() {clearInterval(intervalID);console.log("clic pause");});
    $('#btnNext').on('click', function () {nextDiapo(); console.log("clic suivant");}); 
});







                                                                            /* CARTE */



//script Leflet insertion de la carte
let mymap = L.map('carte').setView([48.210918, 16.371108], 12);


//couche de tuiles
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    maxZoom: 15,
    minZoom: 12,
	id: 'mapbox.streets',
	accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// Nous ajoutons un marqueur
let marker = L.marker([48.211314, 16.384902]).addTo(mymap);

// Nous parcourons la liste des villes
/*
for (ville in villes) {
	var marker = L.marker([villes[ville].lat, villes[ville].lon]).addTo(macarte);
	// Nous ajoutons la popup. A noter que son contenu (ici la variable ville) peut être du HTML
	marker.bindPopup(ville);
} */   
//on met la latitude et la longitude dans un tableau


/////////////////////////////////////////////////ESSAIS///////////////////////////////////////////






/*
function transferSlide() {
    $('#sliderRow').find("div:last").after($('#sliderRow').find("div:first"));
}
*/

/*
function changerSlide(suivant) {
        $('#slider .d-block').animate({marginLeft:"-3500"}, 800,"linear", function() {
        $('#slider .d-block + .slide').css('margin-left','3500px'); // remplacer le selecteur par selecteur
        $('#slider .d-block + .slide').removeClass('d-none').addClass('d-block');
        $('#slider .d-block + .slide').animate({marginLeft:"0px"},800,"linear");
        $(this).removeClass('d-block').addClass('d-none');
    });
};
*/

/*
function changerSlide() {
    $('#slider .d-block').animate({marginLeft:"-3500"}, 800,"linear", function() {

            $('#slider .d-block + .slide').removeClass('d-none').addClass('d-block');
            $(this).removeClass('d-block').addClass('d-none');
 
    });
};

$(function() {
    setInterval(changerSlide, 5000);
});
*/

/*
function transferSlide() {
    $('#sliderRow').find("div:last").after($('#sliderRow').find("div:first"));
}
*/