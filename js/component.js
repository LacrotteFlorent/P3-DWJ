class Component {                                 // Classe Composant //

    localStockageOk;
    sessionStockageOk;
    
    constructor(adresse, statusDetail, nbVelo, nbPlace, latitude, longitude) {
        this.adresse = adresse;
        this.statusDetail = statusDetail;
        this.nbVelo = nbVelo;
        this.nbPlace = nbPlace;
        this.latitude = latitude;
        this.longitude = longitude;

        this.displayComponent();
    }

    displayComponent() {
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

    componentButton() {


        //On affiche le bouton seulement si on peux réserver !!! => Vélo Dispo et station ouverte !
        // ON vérifie que la signature est présente et que le formulaire est remplis !
        // on stocke l'info dans l'API Web Storage

    }
}