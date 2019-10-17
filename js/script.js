































//Script Diaporama
console.log($('#slider .d-block'));

function changerSlide(suivant) {
    let selection = ($('#slider .d-block + .slide'));
    if(suivant){
        if($('.slide .slide6')) {
            selection = $('#slider1')
        }

        else {
            
        }
    }
    else {

    }

    $('#slider .d-block').animate({marginLeft:"-3500"}, 800,"linear", function() {
        $('#slider .d-block + .slide').css('margin-left','3500px'); // remplacer le selecteur par selecteur
        $('#slider .d-block + .slide').removeClass('d-none').addClass('d-block');
        $('#slider .d-block + .slide').animate({marginLeft:"0px"},800,"linear");
        $(this).removeClass('d-block').addClass('d-none');
    });


    //$('#slider div div:last').after($('#slider div div:first'));        //filter('div:first').after($(this).filter('div:last'));
        //$('#sliderRow').find("div:last").after($('#sliderRow').find("div:first"));
    //$(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
    //$('#slider div').first()
};

function transferSlide() {
    $('#sliderRow').find("div:last").after($('#sliderRow').find("div:first"));
}

$(function() {
    setInterval(changerSlide, 5000);
    setInterval(transferSlide, 5000);
});





/*
function changerSlide() {
    $('#slider .d-block').animate({marginLeft:"-3500"}, 800,"linear", function() {

            $('#slider .d-block + .slide').removeClass('d-none').addClass('d-block');
            $(this).removeClass('d-block').addClass('d-none');
 
    });
};

$(function() {
    setInterval(changerSlide, 5000);
});
*/