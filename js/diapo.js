let boutons = "#btnPrev, #btnPlay, #btnNext, #btnPause, #btnSlide1, #btnSlide2, #btnSlide3, #btnSlide4, #btnSlide5, #btnSlide6";

// Fonctions de désactivation des boutons pour gérer le clic quand l'animation est en cours
function desactiverBtns () {
    $(boutons).prop('disabled', true);
}
function activerBtns () {
    $(boutons).prop('disabled', false);
}

// Fonction diapo suivante
function nextDiapo () {
    desactiverBtns();
    clearInterval(intervalID);
    $('#sliderRow > div:visible').animate({marginLeft:"-3500px"}, 800,"linear", function() {
        if($(this).is('#sliderRow > div:last-child')) {
            $('#slide1').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
        else {
            $(this).next('div').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
    });
}

// Fonction diapo précédente
function prevDiapo () {
    desactiverBtns();
    clearInterval(intervalID);
    $('#sliderRow > div:visible').animate({marginLeft:"-3500px"}, 800,"linear", function() {
        if(($(this).is('#sliderRow > div:first-child'))) {
            $('#slide6').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
        else {
            $(this).prev('div').show(function() {
                imageSlide();
                $(this).animate({marginLeft:"0px"}, 800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        }
    });
}

// Délai de 5 sec entre chaque diapo
let intervalID;
let tempoOn = true; // Vrai si la diapo est en mode lecture
$('.fa-play').css('color','#7A050C'); //
function tempo() {
    intervalID = setInterval(nextDiapo,5000);
}

// Boutons de la diapo
$(function() {
    tempo();
    $('#btnPrev').on('click', function() {prevDiapo(); console.log("clic precedent");});
    $('#btnPlay').on('click', function() {tempo(); console.log("clic play"); tempoOn=true;$('.fa-play').css('color','#7A050C');$('.fa-pause').css('color','#F7BE03');});
    $('#btnPause').on('click', function() {clearInterval(intervalID); tempoOn=false; console.log("clic pause");$('.fa-play').css('color','#F7BE03');$('.fa-pause').css('color','#7A050C');});
    $('#btnNext').on('click', function () {nextDiapo(); console.log("clic suivant");}); 
});

// Boutons slides
let boutonsSlides = ['#btnSlide1','#btnSlide2','#btnSlide3','#btnSlide4','#btnSlide5','#btnSlide6'];
let slides = ['#slide1','#slide2','#slide3','#slide4','#slide5','#slide6'];

// Selecteurs de slides
for (let i=0 ; i < slides.length ; i++) {
    $(boutonsSlides[i]).on('click', function() {
        desactiverBtns();
        clearInterval(intervalID);
        $('#sliderRow > div:visible').animate({marginLeft:"-3500"}, 800,"linear", function() {
            $(slides[i]).show(function() {
                imageSlide();
                $(slides[i]).animate({marginLeft:"0px"}, 800,"linear", function() {
                    activerBtns();
                    if(tempoOn===true) {
                        tempo();
                    }
                });
            });
            $(this).hide().css('margin-left','3500px');
        });
    });
}

// Changements des apparances des selecteurs de slide suivant la slide active
function imageSlide() {
    for (let i=0; i < slides.length; i++) {
        if($('#sliderRow > div:visible').is($(slides[i]))) {
            $('#btnSlide1, #btnSlide2, #btnSlide3, #btnSlide4, #btnSlide5, #btnSlide6').html('<i class="far fa-circle"></i>');
            $(boutonsSlides[i]).html('<i class="fas fa-circle"></i>');
        }
    }
}