

//On crée la carte !

    let myObject = new Map(globalConfig.apiKey, 60000, 18, 13, -27.482279, 153.028723, 13, 16);
    let myStorageTest = new Booking;
    myStorageTest.displayStorage();








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