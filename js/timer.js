class CountDown {

    secondes;
    minutes;
    heures;

    constructor(endTime) {
        this.date = new Date;
        console.log(this.date);
        this.endTime = new Date;
        this.endTime.setTime(endTime);

        this.compilCountdown();
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

    compilCountdown() {
        this.calcSec();
        this.calcMin();

        return (this.secondes, this.minutes);
    }
}

/*

this.recoverDate();
        this.addTimeMin(this.endTime);
        this.tempo();

        this.remainingTime = endTime;


// On récupère la date
recoverDate() {
    this.date = new Date;
    this.timer = this.date;
}

// On ajoute le nb de minutes au timer pour avoir une heure de fin
addTimeMin(minutes) {
    this.timer.setMinutes(this.timer.getMinutes() + minutes);
    console.log("Vous avez jusqu'a " + this.timer.getHours()+"h"+ this.timer.getMinutes()+"m"+ this.timer.getSeconds()+"s" +" pour récupérer votre vélo.")
}

// Fonction compte a rebours
showEndTime() {
    if(this.remainingTime > 1) {
        this.remainingTime = this.remainingTime - 1;
        console.log(this.remainingTime);
    }
    else {
        this.remainingTime = 0;
        console.log(this.remainingTime);
        clearInterval(this.intervalID);
    }
}

// Tempo du compte à rebours
tempo() {
    this.showEndTime();
    this.intervalID = setInterval(function(){this.showEndTime()}.bind(this),60000);
}

*/