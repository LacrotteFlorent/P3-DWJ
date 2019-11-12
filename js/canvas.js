class Canvas {                                      // Classe Canvas //

    constructor() {
        this.canvas = $('#canvas');
        this.canvasPos = $('#canvas').offset();
        this.context = canvas.getContext('2d');
        this.pressed;
        this.curX;
        this.curY;
        this.clicX = new Array();
        this.clicY = new Array();
        this.clicDessin = new Array();
        
        this.initCanvas();
        this.boutonPress();
        this.posMouse();
        this.addClick();
        this.clearCanvas();
    }

    boutonPress() {
        // A l'apppuis du bouton de la souris dans le canvas on change la variable pressed
        // On ajoute un click au tableau avec la variable clicDessin = False pour commencer une nouvelle ligne
        $('#canvas').mousedown (function(){
            this.clicX.push(this.curX);
            this.clicY.push(this.curY);
            this.clicDessin.push(false);
            this.pressed = true;
        }.bind(this));

        $('body').mouseup (function() {
            this.pressed = false;
        }.bind(this));
    }
  
    initCanvas() {
        // On initialise le canvas en créant un rectangle blanc
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, 300, 300);
    }
    
    posMouse() {
        // On récupere la position du cuseur quand il est dans le canvas
        $('#canvas').mouseenter().mousemove(function(e) {
            this.curX = (e.pageX) - (this.canvasPos.left);
            this.curY = (e.pageY) - (this.canvasPos.top);
        }.bind(this));
    }

    addClick() {
        // On ajoute des points dans un tableau
        $('#canvas').mousemove (function() {
            if(this.pressed === true) {
                this.clicX.push(this.curX);
                this.clicY.push(this.curY);
                this.clicDessin.push(true);
                this.redraw();
            }
        }.bind(this));
    }

    redraw() { 
        // On remet le canvas dans la position initiale et on dessine les points du tableau
        this.initCanvas();

        this.context.strokeStyle = "#333";
        this.context.lineJoin = "round";
        this.context.lineWidth = "5";

        for(let i=0; i< this.clicX.length; i++) {
            this.context.beginPath();

            if (this.clicDessin[i]) { 
                this.context.moveTo(this.clicX[i-1], this.clicY[i-1]);
            }
            else {
                this.context.moveTo(this.clicX[i]-1, this.clicY[i]);
            }
            this.context.lineTo(this.clicX[i], this.clicY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }
    
    clearCanvas() {
        // Au clic du bouton, on re-initialise le canvas
        $('#boutonEffacerCanvas').on('click', function() {
            for (let i=this.clicX.length; i>0; i--) { // On vide le tableau
                this.clicX.pop();
                this.clicY.pop();
                this.clicDessin.pop();
            }
            this.initCanvas(); // On réinitialise le canvas
        }.bind(this));
    }
}