

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



    class Station {                                     // Classe Station //

        marqueur;
        statusDetail;

        constructor(adresse, status, nbVelo, nbPlace, latitude, longitude) {
            this.adresse = adresse;
            this.status = status;
            this.nbVelo = nbVelo;
            this.nbPlace = nbPlace;
            this.latitude = latitude;
            this.longitude = longitude;

            this.genererEtats();
            this.genererMarqueur();
            this.genererPopup();
            this.boutonPopupReservation();            
        }

        genererEtats() {
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

        afficheDetail() {
            console.log(this.adresse);
            console.log(this.status);
            console.log(this.nbVelo);
            console.log(this.nbPlace);
            console.log(this.longitude);
            console.log(this.latitude);
        }
    
        genererMarqueur() {
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
    
        genererPopup() {
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
            else {  // Si la station à le status fermé
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

        boutonPopupReservation() {
            // Implémentation du click du bouton réservation
            $(this.marqueur).on('click', function() {
                $('.btnSub').on('click', function() {
                    console.log('Vous avez cliqué sur le bouton réservation de la station : ' + this.adresse);
                    const description = new Description(this.adresse, this.statusDetail, this.nbVelo, this.nbPlace, this.latitude, this.longitude);
                }.bind(this));
            }.bind(this));
        }
    }


    class Description {                                 // Classe Description //

        localStockageOk;
        sessionStockageOk;
        
        constructor(adresse, statusDetail, nbVelo, nbPlace, latitude, longitude) {
            this.adresse = adresse;
            this.statusDetail = statusDetail;
            this.nbVelo = nbVelo;
            this.nbPlace = nbPlace;
            this.latitude = latitude;
            this.longitude = longitude;

            this.afficherDescription();
            this.stockageDispo();
        }

        afficherDescription() {
            //affiche l'encart description avec les éléments de la station
            $('#adresseDescription').text(" " + this.adresse);
            $('#etatDescription').text(" " + this.statusDetail);
            $('#veloDescription').text(" " + this.nbVelo);
            $('#placeDescription').text(" " + this.nbPlace);
            $('#coordonneeDescription').text('Lat. ' + this.latitude + ' , Long. ' + this.longitude);
            $("#informations").removeClass("d-none").addClass("d-block col-lg-3");
            $("#carte").removeClass("col-lg-12").addClass("col-lg-9");

            let canvas = new Canvas;
            canvas.initCanvas(); // ATTENTION on initialise le canvas une fois l'element visible (sinon .offset ne fonctionne pas !)

            //ferme l'encart description
            $('#fermerReservation').on('click', function() {
                $("#carte").removeClass("col-lg-9").addClass("col-lg-12");
                $("#informations").removeClass("d-block col-lg-3").addClass("d-none");
            });
        }

        boutonDescriptionReservation() {


            //On affiche le bouton seulement si on peux réserver !!! => Vélo Dispo et station ouverte !
            // ON vérifie que la signature est présente et que le formulaire est remplis !
            // on stocke l'info dans l'API Web Storage

        }

        stockageDispo() {
            // On teste l'API web storage pour savoir si le navigateur permet le stockage
            function storageAvailable(type) {
                var storage;
                try {
                    storage = window[type];
                    var x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                }
                catch(e) {
                    return e instanceof DOMException && (
                        // everything except Firefox
                        e.code === 22 ||
                        // Firefox
                        e.code === 1014 ||
                        // test name field too, because code might not be present
                        // everything except Firefox
                        e.name === 'QuotaExceededError' ||
                        // Firefox
                        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                        // acknowledge QuotaExceededError only if there's something already stored
                        (storage && storage.length !== 0);
                }
            }

            if (storageAvailable('localStorage')) {
                // Yippee! We can use localStorage awesomeness
                this.localStockageOk = true;
                console.log('Stockage local: OK');
            }
            else {
                // Too bad, no localStorage for us
                this.localStockageOk = false;
                console.log('Stockage local: NO');
            }


            if (storageAvailable('sessionStorage')) {
                // Yippee! We can use localStorage awesomeness
                this.sessionStockageOk = true;
                console.log('Stockage session: OK');
            }
            else {
                // Too bad, no localStorage for us
                this.sessionStockageOk = false;
                console.log('Stockage session: NO');
            }
        }

        stockageLocal() {

        }

        stockageSession() {

        }
    }


    class Canvas {                                      // Classe Canvas //

        constructor() {
            this.canvas = $('#canvas');
            this.canvasPos = $('#canvas').offset();
            this.context = canvas.getContext('2d');
            this.pressed;
            this.curX;
            this.curY;
            this.clicX = new Array();
            this.clicY = new Array();
            this.clicDessin = new Array();
            this.initCanvas();
            this.boutonPress();
            this.posMouse();
            this.ajouterClic();
            this.nettoyerCanvas();
        }

        boutonPress() {
            // A l'apppuis du bouton de la souris dans le canvas on change la variable pressed
            // On ajoute un click au tableau avec la variable clicDessin = False pour commencer une nouvelle ligne
            $('#canvas').mousedown (function(){
                this.clicX.push(this.curX);
                this.clicY.push(this.curY);
                this.clicDessin.push(false);
                this.pressed = true;
            }.bind(this));

            $('body').mouseup (function() {
                this.pressed = false;
            }.bind(this));
        }
      
        initCanvas() {
            // On initialise le canvas en créant un rectangle blanc
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, 300, 300);
        }
        
        posMouse() {
            // On récupere la position du cuseur quand il est dans le canvas
            $('#canvas').mouseenter().mousemove(function(e) {
                this.curX = (e.pageX) - (this.canvasPos.left);
                this.curY = (e.pageY) - (this.canvasPos.top);
            }.bind(this));
        }

        ajouterClic () {
            // On ajoute des points dans un tableau
            $('#canvas').mousemove (function() {
                if(this.pressed === true) {
                    this.clicX.push(this.curX);
                    this.clicY.push(this.curY);
                    this.clicDessin.push(true);
                    this.redessine();
                }
            }.bind(this));
        }

        redessine () { 
            // On remet le canvas dans la position initiale et on dessine les points du tableau
            this.initCanvas();

            this.context.strokeStyle = "#333";
            this.context.lineJoin = "round";
            this.context.lineWidth = "5";

            for(let i=0; i< this.clicX.length; i++) {
                this.context.beginPath();

                if (this.clicDessin[i]) { 
                    this.context.moveTo(this.clicX[i-1], this.clicY[i-1]);
                }
                else {
                    this.context.moveTo(this.clicX[i]-1, this.clicY[i]);
                }
                this.context.lineTo(this.clicX[i], this.clicY[i]);
                this.context.closePath();
                this.context.stroke();
            }
        }
        
        nettoyerCanvas() {
            // Au clic du bouton, on re-initialise le canvas
            $('#boutonEffacerCanvas').on('click', function() {
                for (let i=this.clicX.length; i>0; i--) { // On vide le tableau
                    this.clicX.pop();
                    this.clicY.pop();
                    this.clicDessin.pop();
                }
                this.initCanvas(); // On réinitialise le canvas
            }.bind(this));
        }
    }


    class Carte {                                       // Classe Carte //

        stations;
        macarte;
        marqueurs;
        intervalleActualisation;

        constructor(apiKey, refreshTime, maxZoom, minZoom, vueInitialeLong, vueInitialeLat, zoomInitial, disableZoomCluster) {
            this.apiKey = apiKey;
            this.refreshTime = refreshTime;
            this.maxZoom = maxZoom;
            this.minZoom = minZoom;
            this.vueInitialeLong = vueInitialeLong;
            this.vueInitialeLat = vueInitialeLat;
            this.zoomInitial = zoomInitial;
            this.disableZoomCluster = disableZoomCluster;
            
            this.initCarte();
            this.loadLayers();
            this.initClusters();
            this.refresh();
        }

        initCarte() {
            // initialisation de la carte
            this.macarte = L.map('carte').setView([this.vueInitialeLong, this.vueInitialeLat], this.zoomInitial);
        }

        loadLayers() {
            // Chargement des tuiles
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                maxZoom: this.maxZoom,
                minZoom: this.minZoom,
            }).addTo(this.macarte);
        }

        initClusters() {
            // On initialise les clusters
            this.marqueurs = L.markerClusterGroup({disableClusteringAtZoom: this.disableZoomCluster});
        }

        refresh() {
            // Set le timer de refresh
            this.afficher();
            this.intervalleActualisation = setInterval(function(){this.afficher()}.bind(this), this.refreshTime);
        }

        afficher() {
            // Affiche la carte et ajoute les stations
            $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + this.apiKey, function(stations, status) {
    
                console.log("Status de l'appel JCDecaux : " + status);    
        
                this.marqueurs.clearLayers();
                
                let station;
                
                for (station of stations) {
                    const stationVelilov = new Station(station.address, station.status, station.totalStands.availabilities.bikes, station.totalStands.availabilities.stands, station.position.latitude, station.position.longitude);
                    //stationVelilov.afficheDetail();
                    this.marqueurs.addLayer(stationVelilov.marqueur);
                }
        
                this.macarte.addLayer(this.marqueurs);
                console.log("Nombre total de stations : " + stations.length);
            }.bind(this));
        }
    }


    let monObjet = new Carte(apiKey, 60000, 18, 13, -27.482279, 153.028723, 13, 16);









/////////////////////////////////////////////////ESSAIS///////////////////////////////////////////


//////////////////////////////////////carte en procédurale///////////////////////////////
 /*

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

    function refresh () {
        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + apiKey, function(stations, status) {
    
            console.log("Status de l'appel JCDecaux : " + status);    
    
            marqueurs.clearLayers();
            
            for (station of stations) {
                const stationVelilov = new Station(station.address, station.status, station.totalStands.availabilities.bikes, station.totalStands.availabilities.stands, station.position.latitude, station.position.longitude);
                //stationVelilov.afficheDetail();
                marqueurs.addLayer(stationVelilov.marqueur);
            }
    
            macarte.addLayer(marqueurs);
            console.log("Nombre total de stations : " + stations.length);
        });
    };
    */


/////////////////////////////canvas//////////////////////

/*

        // Trace un cercle
        cercle () {
            while (this.pressed === true) {
                this.context.beginPath();
                this.context.fillStyle = "#FF4422";
                this.context.moveTo(this.curX, this.curY);
                this.context.arc(this.curX, this.curY, 5, 0, 2 * Math.PI);
                this.context.fill();
            }
        }

        dessinerCanvas () {
            $('#canvas').mousemove(function (e) {
                this.curX = (e.pageX) - (this.canvasPos.left);
                this.curY = (e.pageY) - (this.canvasPos.top);
            })
        }

        
        // On dessine sur le rectangle initialisé avant
        dessinerCanvas() {
            this.context.ligneWidth = "5";
            this.context.strokeStyle = "black";

            /*function cercle(posX, posY, context) {
                while (this.pressed === true) {
                context.beginPath();
                context.fillStyle = "#FF4422";
                context.moveTo(posX, posY);
                context.arc(posX, posY, 5, 0, 2 * Math.PI);
                context.fill();}
            }*

            
            $('#canvas').mousedown(function() {  //////// Faire en sorte que: tant que le bouton de la souris est pressé, on trace des cercles
                console.log('mouseDown');
                console.log(this.curX + ' | ' + this.curY);
                console.log(this.pressed);
                this.pressed = true;
                //cercle(this.curX, this.curY, this.context);
                this.cercle();
                
            }.bind(this));

        }
        */






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