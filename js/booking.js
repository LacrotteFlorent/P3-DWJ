class Booking {                                 // Classe Réservation //

    intervalID;
    date;

    constructor(nom, prenom, stationID, endTime, adress) {
        this.nom = nom;
        this.prenom = prenom;
        this.stationID = stationID;
        this.endTime = endTime;
        this.adress = adress;

        this.storageTest();

        this.remainingTime = (Math.round(((sessionStorage.getItem("endTime"))-(Date.now()/1000))/60));
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

    setLocalStorage(variableString, value) {
        //On enregistre une valeur et on affiche le bandeau de réservation
        localStorage.setItem(variableString, value);
    }

    setSessionStorage(variableString, value) {
        // ID station et heure de fin en time Stamp
        sessionStorage.setItem(variableString, value);
    }

    displayStorage() {
        // On affiche le bandeau de réservation si on à une info de stockée en session
        if(sessionStorage.getItem('endTime')) {
            $('#infoReservation').removeClass("d-none").addClass("d-block");
            $('#adressReservation').text(sessionStorage.getItem('adress'));
            this.date = new Date;
            this.date.setTime(sessionStorage.getItem("endTime"));
            $('#endTimer').text(this.date.getHours()+"h"+ this.date.getMinutes()+"m"+ this.date.getSeconds()+"s");
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
        // on affiche le temps restant en minutes avant la fin
        if(  la date du jour est la meme que la date de fin de resa) {
            if(this.remainingTime >= 1) {
                this.remainingTime = (Math.round(((sessionStorage.getItem("endTime"))-(Date.now()/1000))/60));
                console.log("Temps restant réservation: " + this.remainingTime) + "min";
                $('#timerReservation').text(this.remainingTime);
            }
            else {
                this.remainingTime = 0;
                console.log(this.remainingTime);
                $('#timerReservation').text(this.remainingTime);
            }
        }
        else {
            this.remainingTime = 0;
            console.log(this.remainingTime);
            $('#timerReservation').text(this.remainingTime);
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 5min on change la couleur du bandeau en orange
        if(this.remainingTime <= 5) {
            $('#infoReservation').css('background-color','orange');
        }

        // si l'heure de fin est egale ou supérieur a l'heure actuelle - 2min on change la couleur du bandeau en orange
        if(this.remainingTime <= 2) {
            $('#infoReservation').css('background-color','red');
        }

        //si l'heure de fin est egale ou supérieure à l'heure actuelle on ferme la reservation
        if(this.remainingTime <= 0) {
            $('#infoReservation').removeClass("d-block").addClass("d-none");
        }

    }

    // on compare les temps toutes les minutes
    tempo() {
        this.refreshStorage();
        this.intervalID = setInterval(function(){this.refreshStorage()}.bind(this),60000);
    }
}