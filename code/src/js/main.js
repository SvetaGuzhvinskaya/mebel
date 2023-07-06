svg4everybody();
document.addEventListener('DOMContentLoaded', function () {
  const region = document.querySelectorAll('.js-select');
  for (let i = 0; i < region.length; i++) {
    const choices = new Choices(region[i], {
      searchEnabled: false,
      shouldSort: false,
    });
  }

  // Btn menu
  document.querySelector(".js-open").addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle("is-open")
    document.querySelector(".js-menu").classList.toggle("is-open");
  });

  const els = document.querySelectorAll(".main-nav__link");
  els.forEach((el) => {

    el.addEventListener("click", function () {

      if (window.innerWidth < 1000) {
        document.querySelector(".js-menu").classList.toggle("is-open");
      }
    });
  });

  // sliders
  var swiperHero = new Swiper(".js-slider-hero", {
    effect: 'fade',
    focusableElements: 'a',
    autoHeight: true,
    fadeEffect: {
      crossFade: false,
    },
    autoplay: {
      delay: 30000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });

  var swiperSpecial = new Swiper(".js-slider-special", {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 20,
    focusableElements: 'a',
    roundLengths: true,
    autoHeight: true,
    navigation: {
      nextEl: '.special-button-next',
      prevEl: '.special-button-prev',
    },
    breakpoints: {
      650: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 32,
      },
      900: {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: "auto",
        slidesPerGroup: 3,
        spaceBetween: 32,
      }
    }
  });

  var swiperUseful = new Swiper(".js-slider-useful", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    focusableElements: 'a',
    roundLengths: true,
    autoHeight: true,
    navigation: {
      nextEl: '.useful-button-next',
      prevEl: '.useful-button-prev',
    },
    breakpoints: {
      650: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      900: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1025: {
        slidesPerView: 2,
        slidesPerGroup: 3,
        spaceBetween: 32,
      }
    }
  });

  var swiperCatalog = new Swiper(".js-slider-catalog", {
    slidesPerView: 2,
    slidesPerGroup: 2,
    grid: {
      rows: 3
    },
    spaceBetween: 16,
    focusableElements: 'a',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return '<span class="btn btn--outline btn--xxs pagination__item ' + className + '">' + (index + 1) + "</span>";
      }
    },
    breakpoints: {
      768: {
        spaceBetween: 32
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32
      }
    }
  });

  var swiperProductThumbs = new Swiper(".js-slider-prod-thumbs", {
    spaceBetween: 62,
    slidesPerView: 1,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 78,
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 78,
      },
      1295: {
        slidesPerView: 4,
        spaceBetween: 38,
      }
    }
  });

  var swiperProductMain = new Swiper(".js-slider-prod-main", {
    spaceBetween: 38,
    thumbs: {
      swiper: swiperProductThumbs,
    },
  });

  var swiperProducts = new Swiper(".js-slider-products", {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 16,
    focusableElements: 'a',
    roundLengths: true,
    navigation: {
      nextEl: '.products-button-next',
      prevEl: '.products-button-prev',
    },
    breakpoints: {
      620: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1295: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 32,
      }
    }
  });

  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      type: "classic",
    },
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });

  $(".js-btn-more").click(function () {
    $(this).fadeOut();
    $.get("/ajax.html#load-home-products", function (data) { $("#home-products").append(data); });

  });

  $(function ($) {
    $(document).click(function(e)
      {
      let target = e.target;
      if (!$(target).is('.widget__title') && !$(target).parents().is('.widget__entry')) {
        $('.widget__title').removeClass('is-open');
        $('.widget__entry').removeClass('is-open');
      }
    });

    $('.widget__title').on('click', function(){
      $(this).parents('.widget').siblings('.widget').children('.widget__title').removeClass('is-open');
      $(this).parents('.widget').siblings('.widget').children('.widget__entry').removeClass('is-open');
      $(this).toggleClass('is-open');
      $(this).next('.widget__entry').toggleClass('is-open');
    });
  });

  const rangeSlider = document.getElementById('slider-range');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [2000, 150000],
      connect: true,
      step: 1,
      range: {
        'min': [0],
        'max': [200000]
      }
    });

    const input0 = document.getElementById('amountStart');
    const input1 = document.getElementById('amountEnd');
    const inputs = [input0, input1];

    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;

      console.log(arr);

      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        console.log(index);
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }

  tippy('.js-tooltip', {
    animation: 'scale',
    trigger: 'click',
  });

  if (document.querySelector('#feedbackForm')) {
    const validator = new JustValidate(document.querySelector('#feedbackForm'));
    let nameField = document.querySelector('#nameInput');
    let phoneField = document.querySelector('#phoneInput');
    let emailField = document.querySelector('#emailInput');

    validator
      .addField(nameField, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'maxLength',
          value: 15,
          errorMessage: 'Недопустимый формат',
        },
      ])
      .addField(phoneField, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          rule: 'number',
          value: 10,
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'minLength',
          value: 11,
          errorMessage: 'Некорректный номер',
        },
        {
          rule: 'maxLength',
          value: 11,
          errorMessage: 'Некорректный номер',
        },
      ])
      .addField(emailField, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          rule: 'required',
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'email',
          errorMessage: 'Недопустимый формат',
        },
      ]);
  }

  if (document.querySelector('#buyFormProd')) {
    const validatorProd = new JustValidate(document.querySelector('#buyFormProd'));
    let nameFieldProd = document.querySelector('#nameInputProd');
    let phoneFieldProd = document.querySelector('#phoneInputProd');

    validatorProd
      .addField(nameFieldProd, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'maxLength',
          value: 15,
          errorMessage: 'Недопустимый формат',
        },
      ])
      .addField(phoneFieldProd, [
        {
          rule: 'required',
          errorMessage: 'Поле обязательно для заполнения',
        },
        {
          rule: 'number',
          value: 10,
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'minLength',
          value: 11,
          errorMessage: 'Некорректный номер',
        },
        {
          rule: 'maxLength',
          value: 11,
          errorMessage: 'Некорректный номер',
        },
      ]).onSuccess(function(e) {
        Fancybox.close();
        const fancybox = new Fancybox([
          {
            src: '<div class="thank-entry"><svg class="icon thank-entry__icon-svg"><use xlink:href="images/sprite.svg#icon-elephant"></use></svg><h2 class="title thank-entry__title">Спасибо, мы вам перезвоним!</h2></div>',
            type: "html",
          },
        ]);
      });
  }

});
