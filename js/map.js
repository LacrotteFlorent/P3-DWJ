class Map {                                       // Classe Map //

    stationID;
    myMap;
    markers;
    refreshInterval;
    contrat;
    latitudeMap;
    longitudeMap;

    constructor(apiKey, refreshTime, maxZoom, minZoom, vueInitialeLong, vueInitialeLat, zoomInitial, disableZoomCluster) {
        this.apiKey = apiKey;
        this.refreshTime = refreshTime;
        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.vueInitialeLong = vueInitialeLong;
        this.vueInitialeLat = vueInitialeLat;
        this.zoomInitial = zoomInitial;
        this.disableZoomCluster = disableZoomCluster;

        this.contrat = globalConfig.ville.contrat_name;
        
        this.initCarte();
        this.listChoice();
        this.loadLayers();
        this.initClusters();
        this.refresh();
    }

    listChoice() {
        //Récupère et affiche la liste des contrats disponnibles
        $.getJSON("https://api.jcdecaux.com/vls/v3/contracts?&apiKey=d48e8a6be13635c9408cd25496e3615a596d0a51", function(contrats) {
            let contrat;
            $('#cityList').empty();
            console.log('Nombre de contrats disponnibles: ' + contrats.length);
            $('#cityList').append('<option value=' + globalConfig.ville.contrat_name + '>' + globalConfig.ville.cities + '</option>');
            for(contrat of contrats) {
                if(contrat.commercial_name != null & contrat.name != globalConfig.ville.contrat_name) {
                    $('#cityList').append('<option value=' + contrat.name + '>' + contrat.cities + '</option>');
                }
            }
        });

        $('#cityList').change(function () {
            this.contrat = $('#cityList').val();
            this.refresh();
        }.bind(this));
    }

    initCarte() {
        // initialisation de la carte
        this.myMap = L.map('carte').setView([this.vueInitialeLong, this.vueInitialeLat], this.zoomInitial);
    }

    loadLayers() {
        // Chargement des tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
        }).addTo(this.myMap);
    }

    initClusters() {
        // On initialise les clusters
        this.markers = L.markerClusterGroup({disableClusteringAtZoom: this.disableZoomCluster});
    }

    refresh() {
        // Set le timer de refresh
        clearInterval(this.refreshInterval);
        this.showMap();
        this.refreshInterval = setInterval(function(){this.showMap()}.bind(this), this.refreshTime);
    }

    showMap() {
        // Affiche la carte et ajoute les stations
        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=" + this.contrat + "&apiKey=" + this.apiKey, function(stations, status) {

            console.log("Status de l'appel JCDecaux : " + status);    
    
            this.latitudeMap = stations[1].position.latitude;
            this.longitudeMap = stations[1].position.longitude;
            this.myMap.setView(new L.LatLng(this.latitudeMap, this.longitudeMap), 13);
            console.log("On se déplace en : " + this.latitudeMap, this.longitudeMap);

            this.markers.clearLayers();
            
            let station;
            this.stationID = 1;
            for (station of stations) {
                const stationVelilov = new Station(station.address, station.status, station.totalStands.availabilities.bikes, station.totalStands.availabilities.stands, station.position.latitude, station.position.longitude, this.stationID);
                this.stationID ++;
                //stationVelilov.showDetail();
                this.markers.addLayer(stationVelilov.marqueur);
            }
    
            this.myMap.addLayer(this.markers);
            console.log("Nombre total de stations : " + stations.length);
        }.bind(this));
    }
}