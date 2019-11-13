class Component {                                 // Classe Composant //

    canvas;

    constructor(adresse, statusDetail, nbVelo, nbPlace, latitude, longitude, stationID) {
        this.adresse = adresse;
        this.statusDetail = statusDetail;
        this.nbVelo = nbVelo;
        this.nbPlace = nbPlace;
        this.latitude = latitude;
        this.longitude = longitude;
        this.stationID = stationID;

        this.displayComponent();
        this.componentButton();
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

        this.canvas = new Canvas;
        this.canvas.initCanvas(); // ATTENTION on initialise le canvas une fois l'element visible (sinon .offset ne fonctionne pas !)

        //ferme l'encart description
        $('#fermerReservation').on('click', function() {
            $("#carte").removeClass("col-lg-9").addClass("col-lg-12");
            $("#informations").removeClass("d-block col-lg-3").addClass("d-none");
        });
    }

    componentButton() {
        // On affiche le bouton seulement si on peux réserver !!! => Vélo Dispo et station ouverte !
        // ON vérifie que la signature est présente et que le formulaire est remplis !
        // on stocke l'info dans l'API Web Storage
        if(this.nbVelo === 0) {
            $('#boutonReservationDescription').prop("disabled", true).css('background-color', 'chocolate').val("Aucuns vélo");
        }
        else {
            $('#boutonReservationDescription').prop("disabled", false).css('background-color', 'white').val("Réserver");
            $('#boutonReservationDescription').on("click", function(e) {
                
                if((this.canvas.clicDessin.length > 1)&&($('#nomFormReservation').val() !== "nom")&&($('#nomFormReservation').val() !== 0)&&($('#prenomFormReservation').val() !== "prenom")&&($('#prenomFormReservation').val() !== 0)) {
                    let resa = new Booking;
                    resa.setLocalStorage("prenom", ($('#prenomFormReservation').val()));
                    resa.setLocalStorage("nom", ($('#nomFormReservation').val()));
                    resa.setSessionStorage("sationID", (this.stationID));
                    resa.setSessionStorage("endTime", "BLABLA POOKIE"); /// faire appel au timer ?
                    resa.setSessionStorage("adress", (this.adresse));
                    resa.displayStorage();
                    
                    e.preventDefault();
                    return false;
                }
                else {
                    alert("Vous n'avez pas saisi d'informations");
                    e.preventDefault();
                    return false;
                }
            }.bind(this));
        }
    }
}