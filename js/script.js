

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
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
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
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
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
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
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
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
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
$('.fa-play').css('color','#7A050C'); //
function tempo() {
    intervalID = setInterval(nextDiapo,5000);
}

// Boutons de la diapo
$(function() {
    tempo();
    $('#btnPrev').on('click', function() {prevDiapo(); console.log("clic precedent");});
    $('#btnPlay').on('click', function() {tempo(); console.log("clic play"); tempoOn=true;$('.fa-play').css('color','#7A050C');$('.fa-pause').css('color','#F7BE03');});
    $('#btnPause').on('click', function() {clearInterval(intervalID); tempoOn=false; console.log("clic pause");$('.fa-play').css('color','#F7BE03');$('.fa-pause').css('color','#7A050C');});
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
                $(slides[i]).animate({marginLeft:"0px"}, 800,"linear", function() {
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


                                                                            /* CARTE */


    let intervalActualisation;

    (function () {      //Fonction auto invoquée
        refresh();
        intervalActualisation = setInterval(refresh,60000);
    })();

    // initialisation de la carte
    macarte = L.map('carte').setView([-27.482279, 153.028723], 13);
            
    // Chargement des tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        maxZoom: 18,
        minZoom: 13,
    }).addTo(macarte);

    let marqueurs = L.markerClusterGroup({disableClusteringAtZoom: 16});

    class Station {

        marqueur;
        statusDetail;

        constructor(adresse, status, nbVelo, nbPlace, latitude, longitude) {
            this.adresse = adresse;
            this.status = status;
            this.nbVelo = nbVelo;
            this.nbPlace = nbPlace;
            this.latitude = latitude;
            this.longitude = longitude;

            // On génere les états
            if((this.status === "OPEN") && (this.nbVelo >= 1) && (this.nbPlace >= 1)) {
                this.statusDetail = "OPEN";
            }
            else if((this.status === "OPEN") && (this.nbVelo >= 1) && (this.nbPlace <= 0)) {
                this.statusDetail = "NOTSTAND";
            }
            else if((this.status === "OPEN") && (this.nbVelo <= 0) && (this.nbPlace >= 1)) {
                this.statusDetail = "NOTBIKE";
            }
            else {
                this.statusDetail = "CLOSE";
            }
        }

        afficheDetail () {
            console.log(this.adresse);
            console.log(this.status);
            console.log(this.nbVelo);
            console.log(this.nbPlace);
            console.log(this.longitude);
            console.log(this.latitude);
        }
    
        genererMarqueur () {
            //On prédéfini plusieurs marqueurs
            let iconeOpen = L.icon({
                iconUrl: "img/icon_marqueurs_open_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeClose = L.icon({
                iconUrl: "img/icon_marqueurs_close_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeOnlyBike = L.icon({
                iconUrl: "img/icon_marqueurs_bike_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeOnlyStand = L.icon({
                iconUrl: "img/icon_marqueurs_stand_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            // On change l'icone du marqueur en fonction des données de la station
            if (this.statusDetail === "OPEN") {
                this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOpen})
            }
            else if (this.statusDetail === "NOTSTAND") {
                this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOnlyBike})
            }
            else if (this.statusDetail === "NOTBIKE") {
                this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOnlyStand})
            }
            else {
                this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeClose})
            }
        }
    
        genererPopup () {
            // On affiche les popup en fonction du status de la station
            if (this.status === "OPEN") {   // Si la station à le status ouvert
                // On défini le texte de la popup
                let htmlPopup = (
                    "<p> <span class=mentions>Adresse:</span> " + this.adresse + "<p>" + 
                    "<p> <span class=mentions>Vélos disponibles:</span> " + this.nbVelo + "<p>" +
                    "<p> <span class=mentions>Places libres:</span> " + this.nbPlace + "<p>" +
                    "<button class=btnSub> Réserver </button>"
                );
                
                // On défini la classe de la popup
                let optionsPopup = {'className' : 'stOpen'};
                
                // On ajoute la popup au marqueur
                this.marqueur.bindPopup(htmlPopup, optionsPopup);
                
                
            }
            else {                          // Si la station à le status fermé
                // On défini le texte de la popup
                let htmlPopup = (
                    "<p> <span class=mentions>Station fermée</span> <p>" + 
                    "<p> <span class=mentions>Adresse:</span> " + this.adresse + "<p>"
                );
    
                // On défini la classe de la popup
                let optionsPopup = {'className' : 'stClose'};
    
                // On ajoute la popup au marqueur
                this.marqueur.bindPopup(htmlPopup, optionsPopup);
            }
        }

        boutonPopupReservation () {
            // Implémentation du click du bouton réservation
            $(this.marqueur).on('click', function() {
                $('.btnSub').on('click', function() {
                    console.log('click');
                    const description = new Description(this.adresse, this.statusDetail, this.nbVelo, this.nbPlace, this.latitude, this.longitude);
                    description.afficherDescription();
                    console.log(this.adresse);
                }.bind(this));
            }.bind(this));
        }
    
    }

    class Description {

        constructor(adresse, statusDetail, nbVelo, nbPlace, latitude, longitude) {
            this.adresse = adresse;
            this.statusDetail = statusDetail;
            this.nbVelo = nbVelo;
            this.nbPlace = nbPlace;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        afficherDescription () {
            //affiche l'encart description avec les éléments de la station
            $('#adresseDescription').text(" " + this.adresse);
            $('#etatDescription').text(" " + this.statusDetail);
            $('#veloDescription').text(" " + this.nbVelo);
            $('#placeDescription').text(" " + this.nbPlace);
            $('#coordonneeDescription').text('Lat. ' + this.latitude + ' , Long. ' + this.longitude);
            $("#informations").removeClass("d-none").addClass("d-block col-lg-3");
            $("#carte").removeClass("col-lg-12").addClass("col-lg-9");

            //ferme l'encart description
            $('#fermerReservation').on('click', function() {
                $("#carte").removeClass("col-lg-9").addClass("col-lg-12");
                $("#informations").removeClass("d-block col-lg-3").addClass("d-none");
            });
        }

        boutonDescriptionReservation () {

        }


    }


function refresh () {
    $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + apiKey, function(stations, status) {

        console.log("Status de l'appel JCDecaux : " + status);    

        marqueurs.clearLayers();
        
        for (station of stations) {
            const stationVelilov = new Station(station.address, station.status, station.totalStands.availabilities.bikes, station.totalStands.availabilities.stands, station.position.latitude, station.position.longitude);
            stationVelilov.genererMarqueur();
            //stationVelilov.afficheDetail();
            stationVelilov.genererPopup();
            marqueurs.addLayer(stationVelilov.marqueur);
            stationVelilov.boutonPopupReservation();
        }
        macarte.addLayer(marqueurs);
        console.log(stations.length);
    });
};


//refresh();














/////////////////////////////////////////////////ESSAIS///////////////////////////////////////////








//////////////////// CARTE fonctionelle en procédurale /////////////////////////////////////////////////////
/*
    let intervalActualisation;
    function tempoRefresh() {
        refresh();
        intervalActualisation = setInterval(refresh,60000);
    }

    tempoRefresh();


    // initialisation de la carte
    macarte = L.map('carte').setView([-27.482279, 153.028723], 13);
            
    // Chargement des tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        maxZoom: 18,
        minZoom: 13,
    }).addTo(macarte);

    let marqueurs = L.markerClusterGroup({disableClusteringAtZoom: 16});

    function refresh () {
        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + apiKey, function(stations, status) {

            console.log("Status de l'appel JCDecaux : " + status);    

            // Personnalisation des marqueurs
            let iconeOpen = L.icon({
                iconUrl: "img/icon_marqueurs_open_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeClose = L.icon({
                iconUrl: "img/icon_marqueurs_close_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeOnlyBike = L.icon({
                iconUrl: "img/icon_marqueurs_bike_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            let iconeOnlyStand = L.icon({
                iconUrl: "img/icon_marqueurs_stand_2.png",
                iconSize: [40, 40],
                icon: [25, 50],
                popupAnchor: [0, -15]
            })
            
            macarte.removeLayer(marqueurs); // On suprimme les précédents marqueurs avant d'actualiser par les nouveaux
            // On ajoute les marqueurs par station
            let marqueur;
            marqueurs.clearLayers();
            for (station of stations) {
               // Nous ajoutons les marqueurs en fonctions de leurs status
               
                if((station.status === "OPEN") && (station.totalStands.availabilities.bikes >= 1) && (station.totalStands.availabilities.stands >= 1)) {
                    marqueur = L.marker([station.position.latitude, station.position.longitude], {icon: iconeOpen})//.addTo(macarte); inutiles lors de l'utilisation des clusters
                }
                else if((station.status === "OPEN") && (station.totalStands.availabilities.bikes >= 1) && (station.totalStands.availabilities.stands <= 0)) {
                    marqueur = L.marker([station.position.latitude, station.position.longitude], {icon: iconeOnlyBike})//.addTo(macarte);
                }
                else if((station.status === "OPEN") && (station.totalStands.availabilities.bikes <= 0) && (station.totalStands.availabilities.stands >= 1)) {
                    marqueur = L.marker([station.position.latitude, station.position.longitude], {icon: iconeOnlyStand})//.addTo(macarte);
                }
                else {
                    marqueur = L.marker([station.position.latitude, station.position.longitude], {icon: iconeClose})//.addTo(macarte);
                }

                // On règle les popups
                if (station.status === "OPEN") {
                    // On défini le texte de la popup
                    let htmlPopup = (
                        "<p> <span class=mentions>Adresse:</span> " + station.address + "<p>" + 
                        "<p> <span class=mentions>Vélos disponibles:</span> " + station.totalStands.availabilities.bikes + "<p>" +
                        "<p> <span class=mentions>Places libres:</span> " + station.totalStands.availabilities.stands + "<p>" +
                        "<button class=btnSub> Réserver </button>"
                    );
                    
                    // On défini la classe de la popup
                    let optionsPopup = {'className' : 'stOpen'};
                    
                    // On ajoute la popup au marqueur
                    marqueur.bindPopup(htmlPopup, optionsPopup);
                    marqueurs.addLayer(marqueur); // On ajoute le marqueur au layer qui correspond au cluster
                    
                }
                else {
                    // On défini le texte de la popup
                    let htmlPopup = (
                        "<p> <span class=mentions>Station fermée</span> <p>" + 
                        "<p> <span class=mentions>Adresse:</span> " + station.address + "<p>"
                    );
                
                    // On défini la classe de la popup
                    let optionsPopup = {'className' : 'stClose'};
                
                    // On ajoute la popup au marqueur
                    marqueur.bindPopup(htmlPopup, optionsPopup);
                    marqueurs.addLayer(marqueur); // On ajoute le marqueur au layer qui correspond au cluster
                
                }
            }
            macarte.addLayer(marqueurs);
        });
    };


    $('body').on('click', '.btnSub', function() {
        console.log('click');
        //$("#informations").removeClass("d-none").addClass("d-block col-lg-3");
        //$("#carte").removeClass("col-lg-12").addClass("col-lg-9");
    });

*/

/////////////////////////////////////////////////////////////////slider/////////////////////////////////////////////////////////////


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






                                                                            /* APPEL JCDECAUX et INITIALISATION DE LA CARTE */
/*
    //$(function () {
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
                accessToken: 'your.mapbox.access.token'    * /
            }).addTo(macarte);

            let marqueurs = L.markerClusterGroup();

            tempoRefesh();
                    
        });
    //});*/