$(document).ready(function () {
    $(".carousel").slick({
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        speed:500,
        easing: 'ease',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        centerMode: true,
        centerPadding: '60px'
    });
});

