class Booking {                                 // Classe Réservation //

    intervalID;
    secondes;
    minutes;
    heures;
    jours;
    totalSec;

    constructor(storagetest , nom, prenom, stationID, endTime, adress) {
        this.date = new Date;
        this.endTime = new Date;

        if(storagetest === true) {
            let session = sessionStorage.getItem("endTime");
            this.endTime.setTime(session);
            this.storageTest();
            this.displayStorage();
        }
        else {
            sessionStorage.clear();

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
            this.endTime.setTime(sessionStorage.getItem('endTime'));
            $('#infoReservation').removeClass("d-none").addClass("d-block");
            $('#adressReservation').text(sessionStorage.getItem('adress'));
            $('#endTimer').text(this.endTime.getHours()+"h"+ this.endTime.getMinutes());//+"m"+ this.endTime.getSeconds()+"s");
            this.tempo();
        }

        //On remplis le formulaire si on à une info de stockée en local
        if(localStorage.getItem('nom')) {
            $('#prenomFormReservation').val(localStorage.getItem('prenom'));
            $('#nomFormReservation').val(localStorage.getItem('nom'));
        }
    }

    refreshStorage() {
        this.date = new Date;
        this.endTime.setTime(sessionStorage.getItem('endTime'));
        this.calcCountdown();
        $('#timerReservation').text(this.minutes + "min" + this.secondes + "sec");

        // si la date de fin est plus petite que la date du jour c'est que l'événement est terminé
        if(this.endTime <= this.date){
            $('#infoReservation').removeClass("d-block").addClass("d-none");
            sessionStorage.clear();
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 5min on change la couleur du bandeau en orange
        if(this.minutes >= 5) {
            $('#infoReservation').css('background-color','darkgreen');
            $('#infoReservation > p').css('color', 'white');
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 5min on change la couleur du bandeau en orange
        if(this.minutes < 5) {
            $('#infoReservation').css('background-color','orange');
            $('#infoReservation > p').css('color', '#333');
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 2min on change la couleur du bandeau en orange
        if(this.minutes < 2) {
            $('#infoReservation').css('background-color','red');
            $('#infoReservation > p').css('color', 'white');
        }
    }

    calcCountdown() {
        this.totalSec = (this.endTime - this.date) /1000;
        this.jours = Math.floor(this.totalSec / (60*60*24));
        this.heures = Math.floor((this.totalSec - (this.jours*60*60*24)) / (60*60));
        this.minutes = Math.floor((this.totalSec - ((this.jours*60*60*24+this.heures*60*60)))/60);
        this.secondes = Math.floor(this.totalSec - ((this.jours*60*60*24+this.heures*60*60+this.minutes*60)));
    }

    // On refresh toutes les secondes
    tempo() {
        this.refreshStorage();
        this.intervalID = setInterval(function(){this.refreshStorage()}.bind(this), 1000);
    }
}