class Booking {                                 // Classe Réservation //

    constructor() {

        this.storageTest();
    }

    storageTest() {
        // On teste l'API web storage pour savoir si le navigateur permet le stockage
        function storageAvailable(type) {
            var storage;
            try {
                storage = window[type];
                var x = '__storage_test__';
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
            this.localStockageOk = true;
            console.log('Stockage local: OK');
        }
        else {
            // Too bad, no localStorage for us
            this.localStockageOk = false;
            console.log('Stockage local: NO');
        }


        if (storageAvailable('sessionStorage')) {
            // Yippee! We can use localStorage awesomeness
            this.sessionStockageOk = true;
            console.log('Stockage session: OK');
        }
        else {
            // Too bad, no localStorage for us
            this.sessionStockageOk = false;
            console.log('Stockage session: NO');
        }
    }

    localStorage() {

    }

    sessionStorage() {

    }
}