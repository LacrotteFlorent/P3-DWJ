

let apiKey = 'd48e8a6be13635c9408cd25496e3615a596d0a51';




                                                                            /* DIAPO */

let boutons = "#btnPrev, #btnPlay, #btnNext, #btnPause, #btnSlide1, #btnSlide2, #btnSlide3, #btnSlide4, #btnSlide5, #btnSlide6";

// Fonctions de désactivation des boutons pour gérer le clic quand l'animation est en cours
function desactiverBtns () {
    $(boutons).prop('disabled', true);
}
function activerBtns () {
    $(boutons).prop('disabled', false);
}

// Fonction diapo suivante
function nextDiapo () {
    desactiverBtns();
    clearInterval(intervalID);
    $('#sliderRow > div:visible').animate({marginLeft:"-3500px"}, 800,"linear", function() {
        if($(this).is('#sliderRow > div:last-child')) {
            $('#slide1').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"},800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
        else {
            $(this).next('div').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"},800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
    });
}

// Fonction diapo précédente
function prevDiapo () {
    desactiverBtns();
    clearInterval(intervalID);
    $('#sliderRow > div:visible').animate({marginLeft:"-3500px"}, 800,"linear", function() {
        if(($(this).is('#sliderRow > div:first-child'))) {
            $('#slide6').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"},800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
        else {
            $(this).prev('div').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"},800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
    });
}

// Délai de 5 sec entre chaque diapo
let intervalID;
let tempoOn = true; // Vrai si la diapo est en mode lecture
function tempo() {
    intervalID = setInterval(nextDiapo,5000);
}

// Boutons de la diapo
$(function() {
    tempo();
    $('#btnPrev').on('click', function() {prevDiapo(); console.log("clic precedent");});
    $('#btnPlay').on('click', function() {tempo(); console.log("clic play"); tempoOn=true;});
    $('#btnPause').on('click', function() {clearInterval(intervalID); tempoOn=false; console.log("clic pause");});
    $('#btnNext').on('click', function () {nextDiapo(); console.log("clic suivant");}); 
});

// Boutons slides
let boutonsSlides = ['#btnSlide1','#btnSlide2','#btnSlide3','#btnSlide4','#btnSlide5','#btnSlide6'];
let slides = ['#slide1','#slide2','#slide3','#slide4','#slide5','#slide6'];

// Selecteurs de slides
for (let i=0 ; i < slides.length ; i++) {
    $(boutonsSlides[i]).on('click', function() {
        desactiverBtns();
        clearInterval(intervalID);
        $('#sliderRow > div:visible').animate({marginLeft:"-3500"}, 800,"linear", function() {
            $(slides[i]).show(function() {
                imageSlide();
                $(slides[i]).animate({marginLeft:"0px"},800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        });
    });
}

// Changements des apparances des selecteurs de slide suivant la slide active
function imageSlide() {
    for (let i=0; i < slides.length; i++) {
        if($('#sliderRow > div:visible').is($(slides[i]))) {
            $('#btnSlide1, #btnSlide2, #btnSlide3, #btnSlide4, #btnSlide5, #btnSlide6').html('<i class="far fa-circle"></i>');
            $(boutonsSlides[i]).html('<i class="fas fa-circle"></i>');
        }
    }
}





                                                                            /* APPEL JCDECAUX et INITIALISATION DE LA CARTE */

    $(function () {
        $.getJSON('https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=' + apiKey, function(data, status) {
            console.log(status);    

            // initialisation de la carte
            macarte = L.map('carte').setView([data[0].position.latitude, data[0].position.longitude], 13);
            

            // Chargement des tuiles
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                maxZoom: 18,
                minZoom: 12,
                /*id: 'mapbox.streets',
                accessToken: 'your.mapbox.access.token'*/
            }).addTo(macarte);

            tempoRefesh();
                    
        });
    });

                                                                            /* ACTUALISATION DE LA CARTE */


    let intervalActualisation
    function tempoRefesh() {
        refresh();
        intervalActualisation = setInterval(refresh,60000);
    }

    function refresh () {
        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + apiKey, function(stations) {

            // Personnalisation du marqueur
            let icone = L.icon({
                iconUrl: "img/icon_marqueurs.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -10]
            })

            //On ajoute les marqueurs par station
            for (station of stations) {
               // Nous ajoutons un marqueur
               let marqueur = L.marker([station.position.latitude, station.position.longitude], {icon: icone}).addTo(macarte);

               if (station.status === "OPEN") {

                    //On défini le texte de la popup
                    let htmlPopup = (
                        "<p> <span class=mentions>Adresse:</span> " + station.address + "<p>" + 
                        "<p> <span class=mentions>Vélos disponibles:</span> " + station.totalStands.availabilities.bikes + "<p>" +
                        "<p> <span class=mentions>Places libres:</span> " + station.totalStands.availabilities.stands + "<p>" +
                        "<button class=reserver> Réserver </button>"
                    );
                    
                    //On défini la classe de la popup
                    let optionsPopup = {'className' : 'stOpen'};
                    
                    //On ajoute la popup au marqueur
                    marqueur.bindPopup(htmlPopup, optionsPopup);
                }

               else {
                    //On défini le texte de la popup
                    let htmlPopup = (
                        "<p> <span class=mentions>Station fermée</span> <p>" + 
                        "<p> <span class=mentions>Adresse:</span> " + station.address + "<p>"
                    );
                
                    //On défini la classe de la popup
                    let optionsPopup = {'className' : 'stClose'};
                
                    //On ajoute la popup au marqueur
                    marqueur.bindPopup(htmlPopup, optionsPopup);
               }

             }

        });
    };





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