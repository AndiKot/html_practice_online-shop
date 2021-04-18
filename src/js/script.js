$(document).ready(function () {
  $(".carousel__inner").slick({
    dots: false,
    speed: 1200,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="../img/icons/arrow-left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../img/icons/arrow-right.png"></button>',
    responsive: [
      {
        breackpoint: 768,
        settings: {
          dots: true,
          arrows: false,
        }
      }
    ]
  });
});
