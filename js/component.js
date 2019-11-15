class Component {                                 // Classe Composant //

    canvas;
    resa;
    hourResa;

    constructor(adresse, statusDetail, nbVelo, nbPlace, latitude, longitude, stationID) {
        this.adresse = adresse;
        this.statusDetail = statusDetail;
        this.nbVelo = nbVelo;
        this.nbPlace = nbPlace;
        this.latitude = latitude;
        this.longitude = longitude;
        this.stationID = stationID;

        this.displayComponentInfo();
        this.componentButton();
    }

    displayComponentInfo() {
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

        this.resa = new Booking;
        this.resa.displayStorage;

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
                    this.resa.setLocalStorage("prenom", ($('#prenomFormReservation').val()));
                    this.resa.setLocalStorage("nom", ($('#nomFormReservation').val()));
                    this.resa.setSessionStorage("sationID", (this.stationID));
                    this.hourResa = new Date;
                    this.hourResa.setMinutes(this.hourResa.getMinutes() + 20);
                    this.hourResa = (Math.round(this.hourResa.getTime()/1000));
                    this.resa.setSessionStorage("endTime",(this.hourResa));
                    this.resa.setSessionStorage("adress", (this.adresse));
                    this.resa.displayStorage(); // On affiche le bandeau
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

    displayComponentInfoBand() {
        // ON compare l'heure actuelle et l'heure de fin et on affiche l'heure de fin et le temps restant
        
    }
}