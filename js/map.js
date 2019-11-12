class Map {                                       // Classe Map //

    stationID;
    myMap;
    markers;
    refreshInterval;

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
        this.showMap();
        this.refreshInterval = setInterval(function(){this.showMap()}.bind(this), this.refreshTime);
    }

    showMap() {
        // Affiche la carte et ajoute les stations
        $.getJSON("https://api.jcdecaux.com/vls/v3/stations?contract=brisbane&apiKey=" + this.apiKey, function(stations, status) {

            console.log("Status de l'appel JCDecaux : " + status);    
    
            this.markers.clearLayers();
            
            let station;
            this.stationID = 1;
            for (station of stations) {
                const stationVelilov = new Station(station.address, station.status, station.totalStands.availabilities.bikes, station.totalStands.availabilities.stands, station.position.latitude, station.position.longitude,this.stationID);
                this.stationID ++;
                //stationVelilov.showDetail();
                this.markers.addLayer(stationVelilov.marqueur);
            }
    
            this.myMap.addLayer(this.markers);
            console.log("Nombre total de stations : " + stations.length);
        }.bind(this));
    }
}