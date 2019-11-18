class Booking {                                 // Classe Réservation //

    intervalID;
    remainingTime;
    remainingTimeDate;
    secondes;
    minutes;

    constructor(test , nom, prenom, stationID, endTime, adress) {
        
        this.date = new Date;
        this.endTime = new Date;

        if(test === true) {
            let session = sessionStorage.getItem("endTime");
            this.endTime.setTime(session);
            this.storageTest();
            this.displayStorage();
        }
        else {
            this.endTime.setTime(endTime);
            this.nom = nom;
            this.prenom = prenom;
            this.stationID = stationID;
            this.adress = adress;
            this.setLocalStorage();
            this.setSessionStorage();
            this.displayStorage();
        }
    }

    storageTest() {
        // On teste l'API web storage pour savoir si le navigateur permet le stockage
        function storageAvailable(type) {
            let storage;
            try {
                storage = window[type];
                let x = '__storage_test__';
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
            console.log('Stockage local: OK');
        }
        else {
            // Too bad, no localStorage for us
            console.log('Stockage local: NO');
        }

        if (storageAvailable('sessionStorage')) {
            // Yippee! We can use localStorage awesomeness
            console.log('Stockage session: OK');
        }
        else {
            // Too bad, no localStorage for us
            console.log('Stockage session: NO');
            alert("Attention votre réservation ne sera pas retenue si vous actualiser la page ou fermez le navigateur.")
        }
    }

    setLocalStorage() {
        // On stocke les infos en local
        localStorage.setItem("prenom", this.prenom);
        localStorage.setItem("nom", this.nom);
    }

    setSessionStorage() {
        // On stocke les infos par session
        sessionStorage.setItem("endTime", this.endTime.getTime());
        sessionStorage.setItem("adress", this.adress);
    }

    displayStorage() {
        //this.date = Date.now();
        // On affiche le bandeau de réservation si on à une info de stockée en session
        if(sessionStorage.getItem('endTime')) {
            $('#infoReservation').removeClass("d-none").addClass("d-block");
            $('#adressReservation').text(sessionStorage.getItem('adress'));
            $('#endTimer').text(this.endTime.getHours()+"h"+ this.endTime.getMinutes()+"m"+ this.endTime.getSeconds()+"s");
            this.tempo();
        }
        else {
            $('#infoReservation').removeClass("d-block").addClass("d-none");
        }

        //On remplis le formulaire si on à une info de stockée en local
        if(localStorage.getItem('nom')) {
            $('#prenomFormReservation').val(localStorage.getItem('prenom'));
            $('#nomFormReservation').val(localStorage.getItem('nom'));
        }
    }

    refreshStorage() {
        this.calcSec();
        this.calcMin();
        $('#timerReservation').text(this.minutes + "min" + this.secondes + "sec");

        // on affiche le temps restant en minutes avant la fin
<<<<<<< HEAD
        if(this.endTime >= this.date) {
            /*if(this.minutes >= 1) {
                console.log("Temps restant réservation: " + this.minutes + "min");
                $('#timerReservation').text(this.minutes + "min" + this.secondes + "sec");
=======
        if(  this.endTime ===  this.endTime/*la date du jour est la meme que la date de fin de resa*/) {
            if(this.remainingTime >= 1) {
                this.remainingTime = (Math.round(((sessionStorage.getItem("endTime"))-(Date.now()/1000))/60));
                console.log("Temps restant réservation: " + this.remainingTime) + "min";
                $('#timerReservation').text(this.remainingTime);
>>>>>>> db81aa6fc723b8e020c349f855864be4333bdbd0
            }
            else {
                this.minutes = 0;
                $('#timerReservation').text(this.minutes + "min" + this.secondes + "sec");
                $('#infoReservation').removeClass("d-block").addClass("d-none");
                sessionStorage.clear();
            }*/

        }
        else {
            this.minutes = 0;
            $('#infoReservation').removeClass("d-block").addClass("d-none");
            sessionStorage.clear();
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 5min on change la couleur du bandeau en orange
        if(this.minutes >= 5) {
            $('#infoReservation').css('background-color','darkgreen');
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 5min on change la couleur du bandeau en orange
        if(this.minutes <= 5) {
            $('#infoReservation').css('background-color','orange');
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 2min on change la couleur du bandeau en orange
        if(this.minutes <= 2) {
            $('#infoReservation').css('background-color','red');
        }

        //si l'heure de fin est egale ou supérieure à l'heure actuelle on ferme la reservation
        if(this.minutes <= 0) {
            $('#infoReservation').removeClass("d-block").addClass("d-none");
        }

    }

    calcSec() {
        if((this.endTime.getSeconds() - this.date.getSeconds())>=0) {   
            this.secondes = (this.endTime.getSeconds() - this.date.getSeconds());
        }
        else {
            this.secondes = (60 + (this.endTime.getSeconds() - this.date.getSeconds()));
        }
    }

    calcMin() {
        if(this.minutes = ((this.endTime.getMinutes() - this.date.getMinutes()))>=0) {
            this.minutes = ((this.endTime.getMinutes() - this.date.getMinutes()));
        }
        else {
            this.minutes = (60 +((this.endTime.getMinutes() - this.date.getMinutes())));
        }
    }

    // on compare les temps toutes les minutes
    tempo() {
        this.refreshStorage();
        this.intervalID = setInterval(function(){this.refreshStorage()}.bind(this), 1000);
    }
}