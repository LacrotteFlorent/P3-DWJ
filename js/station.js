class Station {                                     // Classe Station //

    marqueur;
    statusDetail;

    constructor(adresse, status, nbVelo, nbPlace, latitude, longitude, stationID) {
        this.adresse = adresse;
        this.status = status;
        this.nbVelo = nbVelo;
        this.nbPlace = nbPlace;
        this.latitude = latitude;
        this.longitude = longitude;
        this.stationID = stationID;

        this.generateStates();
        this.markerGenerator();
        this.popupGenerator();
        this.popupButton();
    }

    generateStates() {
        // On génere les états
        if((this.status === "OPEN") && (this.nbVelo >= 1) && (this.nbPlace >= 1)) {
            this.statusDetail = "Ouverte";
        }
        else if((this.status === "OPEN") && (this.nbVelo >= 1) && (this.nbPlace <= 0)) {
            this.statusDetail = "Pas de places";
        }
        else if((this.status === "OPEN") && (this.nbVelo <= 0) && (this.nbPlace >= 1)) {
            this.statusDetail = "Pas de vélos";
        }
        else {
            this.statusDetail = "Fermée";
        }
    }

    showDetail() {
        console.log(this.adresse);
        console.log(this.status);
        console.log(this.nbVelo);
        console.log(this.nbPlace);
        console.log(this.longitude);
        console.log(this.latitude);
    }

    markerGenerator() {
        //On prédéfinis les marqueurs (on récupére les infos dans le fichier config.js)
        let iconeOpen = L.icon({
            iconUrl: globalConfig.iconeOpen.iconUrl,
            iconSize: globalConfig.iconeOpen.iconSize,
            icon: globalConfig.iconeOpen.icon,
            popupAnchor: globalConfig.iconeOpen.popupAnchor,
            });

        let iconeClose = L.icon({
            iconUrl: globalConfig.iconeClose.iconUrl,
            iconSize: globalConfig.iconeClose.iconSize,
            icon: globalConfig.iconeClose.icon,
            popupAnchor: globalConfig.iconeClose.popupAnchor,
        });

        let iconeOnlyBike = L.icon({
            iconUrl: globalConfig.iconeOnlyBike.iconUrl,
            iconSize: globalConfig.iconeOnlyBike.iconSize,
            icon: globalConfig.iconeOnlyBike.icon,
            popupAnchor: globalConfig.iconeOnlyBike.popupAnchor,
        })

        let iconeOnlyStand = L.icon({
            iconUrl: globalConfig.iconeOnlyStand.iconUrl,
            iconSize: globalConfig.iconeOnlyStand.iconSize,
            icon: globalConfig.iconeOnlyStand.icon,
            popupAnchor: globalConfig.iconeOnlyStand.popupAnchor,
        })

        // On change l'icone du marqueur en fonction des données de la station
        if (this.statusDetail === "Ouverte") {
            this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOpen})
        }
        else if (this.statusDetail === "Pas de places") {
            this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOnlyBike})
        }
        else if (this.statusDetail === "Pas de vélos") {
            this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeOnlyStand})
        }
        else {
            this.marqueur = L.marker([this.latitude, this.longitude], {icon: iconeClose})
        }
    }

    popupGenerator() {
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

    popupButton() {
        // Implémentation du click du bouton réservation
        $(this.marqueur).on('click', function() {
            $('.btnSub').on('click', function() {
                console.log('Vous avez cliqué sur le bouton réservation de la station : ' + this.adresse);
                const component = new Component(this.adresse, this.statusDetail, this.nbVelo, this.nbPlace, this.latitude, this.longitude, this.stationID);
            }.bind(this));
        }.bind(this));
    }
}