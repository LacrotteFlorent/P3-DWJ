  

// Ici tu peux configurer quelques paramètres...

  
  let globalConfig = {
        //Ville au chargement
        ville : {
            contrat_name: "brisbane",
            cities: "Brisbane",
            latInit: -27.482279,
            longInit: 153.028723,
        },

        //Temps de réservation du vélo en minutes
        bookingTime : 20,
        
        //Clé API JCDecaux
        apiKey : 'd48e8a6be13635c9408cd25496e3615a596d0a51',

        //Marqueurs des stations de la carte
        iconeOpen : {
            iconUrl: "img/icon_marqueurs_open_2.png",
            iconSize: [40, 40],
            icon: [25, 50],
            popupAnchor: [0, -15]
        },
        iconeClose : {
            iconUrl: "img/icon_marqueurs_close_2.png",
            iconSize: [40, 40],
            icon: [25, 50],
            popupAnchor: [0, -15]
        },
        iconeOnlyBike : {
            iconUrl: "img/icon_marqueurs_bike_2.png",
            iconSize: [40, 40],
            icon: [25, 50],
            popupAnchor: [0, -15]
        },
        iconeOnlyStand : {
            iconUrl: "img/icon_marqueurs_stand_2.png",
            iconSize: [40, 40],
            icon: [25, 50],
            popupAnchor: [0, -15]
        },

        //Temps entre chaque rafraichissement de la carte et des stations en ms
        refresh: 60000,

        //Zoom Maximum (entre 0 et 20)
        zoomMax: 18,

        //Zoom Minimum (entre 0 et 20)
        zoomMin: 11,

        //Zoom initial (entre 0 et 20)
        zoomInit: 12,

        //Désactivation des clusters à ce zoom (entre 0 et 20)
        zoomCluster: 16
    };