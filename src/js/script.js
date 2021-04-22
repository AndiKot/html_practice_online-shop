$(document).ready(function () {
  $('.carousel__inner').slick({
    dots: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function() {
    $(this)
      .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
      .closest('div.container').find('div.catalogue__content').removeClass('catalogue__content_active').eq($(this).index()).addClass('catalogue__content_active');
  });

  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalogue-item__content').eq(i).toggleClass('catalogue-item__content_active');
        $('.catalogue-item__list').eq(i).toggleClass('catalogue-item__list_active');
      })
    });
  }

  toggleSlide('.catalogue-item__link');
  toggleSlide('.catalogue-item__back');

  //Modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });

  // $('.button_mini').on('click', function(){
  //   $('.overlay, #order').fadeIn('slow');
  // });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #oreder, #thanks').fadeOut('slow');
  });

  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalogue-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  // Form validation
    function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true
        },
      },
      messages:{
        name: {
          required: "Это поле обязательно для ввода",
          minlength: jQuery.validator.format("Нужно как минимум {0} символов"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email:{
          required: "Нам нужен ваш email",
          email: "Ваш email адрес должен быть в формате name@domain.com"
        }
      },
    });
  }
  
  validateForms('#consulatation-form');
  validateForms('#consulatation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7(999) 999-99-99");

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function(){
      $(this).find('input').val('');

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
  // Smooth scroll and Pageup
  $(window).scroll(function(){
    if($(this).scrollTop() > 1200){
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top+"px"
    });
    return false;
  });
});
