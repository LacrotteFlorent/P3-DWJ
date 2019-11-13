class Booking {                                 // Classe Réservation //

    constructor(nom, prenom, stationID, endTime, adress) {
        this.nom = nom;
        this.prenom = prenom;
        this.stationID = stationID;
        this.endTime = endTime;
        this.adress = adress;

        this.storageTest();
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
        if(sessionStorage.getItem('adress')) {
            $('#infoReservation').removeClass("d-none").addClass("d-block col-lg-12");
            $('#adressReservation').text(sessionStorage.getItem('adress'));
        }

        //On remplis le formulaire si on à une info de stockée en local
        if(localStorage.getItem('nom')) {
            $('#prenomFormReservation').val(localStorage.getItem('prenom'));
            $('#nomFormReservation').val(localStorage.getItem('nom'));
        }
    }
}