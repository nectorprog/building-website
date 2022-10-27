$(document).ready(function () {
    const regSuccess = $('#reg-success');
    const regPopup = $('.reg-popup');
    const burger = $('.burger');
    const burgerMenuWrapper = $('.burger-menu-wrapper');
    const burgerHelps= $('.burger-helps');
    const popupClose= $('.popup-close');

    const jqPiItem = $('.pi-item-more');
    const jqMoreProjects = $('#more-projects');
    const jqLessProjects = $('#less-projects');

    const tc1 = $('.tc1');
    const tc2 = $('.tc2');
    const tc3 = $('.tc3');
    const tc4 = $('.tc4');
    const tc5 = $('.tc5');

    const tci1 = $('.tci1');
    const tci2 = $('.tci2');
    const tci3 = $('.tci3');
    const tci4 = $('.tci4');
    const tci5 = $('.tci5');

    const amp = $('.adaptive-more-pr');

    tc1.click( (ev) => {
        if (tc1.hasClass("tc-active")) {
            tci1.hide();
            tc1.removeClass('tc-active');
        }
        else {
            tci1.show();

            tc1.addClass('tc-active');

            tci2.hide();
            tci3.hide();
            tci4.hide();
            tci5.hide();

            tc2.removeClass('tc-active');
            tc3.removeClass('tc-active');
            tc4.removeClass('tc-active');
            tc5.removeClass('tc-active');
        }

        return false;
    });
    tc2.click( (ev) => {
        if (tc2.hasClass("tc-active")) {
            tci2.hide();
            tc2.removeClass('tc-active');
        }  else {
            tci2.show();
            tc2.addClass('tc-active');

            tci1.hide();
            tci3.hide();
            tci4.hide();
            tci5.hide();

            tc1.removeClass('tc-active');
            tc3.removeClass('tc-active');
            tc4.removeClass('tc-active');
            tc5.removeClass('tc-active');
        }

        return false;
    });
    tc3.click( (ev) => {
        if (tc3.hasClass("tc-active")) {
            tci3.hide();
            tc3.removeClass('tc-active');
        } else {
            tci3.show();
            tc3.addClass('tc-active');

            tci2.hide();
            tci1.hide();
            tci4.hide();
            tci5.hide();

            tc2.removeClass('tc-active');
            tc1.removeClass('tc-active');
            tc4.removeClass('tc-active');
            tc5.removeClass('tc-active');
        }

        return false;
    });
    tc4.click( (ev) => {
        if (tc4.hasClass("tc-active")) {
            tci4.hide();
            tc4.removeClass('tc-active');
        } else {
            tci4.show();
            tc4.addClass('tc-active');

            tci2.hide();
            tci3.hide();
            tci1.hide();
            tci5.hide();

            tc2.removeClass('tc-active');
            tc3.removeClass('tc-active');
            tc1.removeClass('tc-active');
            tc5.removeClass('tc-active');
        }

        return false;
    });
    tc5.click( (ev) => {
        if (tc5.hasClass("tc-active")) {
            tci5.hide();
            tc5.removeClass('tc-active');
        } else {
            tci5.show();
            tc5.addClass('tc-active');

            tci2.hide();
            tci3.hide();
            tci4.hide();
            tci1.hide();

            tc2.removeClass('tc-active');
            tc3.removeClass('tc-active');
            tc4.removeClass('tc-active');
            tc1.removeClass('tc-active');
        }

        return false;
    });

    regSuccess.hide();
    burgerMenuWrapper.hide();
    burgerHelps.hide();

    $("#header-menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();


        const id  = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;


        $('body,html').animate({scrollTop: top}, 200);
    });

    const slider = tns({
        container: ".slider",
        mode: "carousel",
        edgePadding: 79,
        slideBy: 1,
        center: true,
        controlsPosition: 'bottom',
        navPosition: 'bottom',
        navAsThumbnails: true,
        autoplay: false,
        autoplayButtonOutput: false,
        controlsContainer: "#custom-control",
        responsive: {
            320: {
                items: 1,
                center: true,
                fixedWidth: false,
                gutter: 0,
                edgePadding: 0,
                controls: false
            },
            680: {
                items: 1,
                center: true,
                fixedWidth: false,
                gutter: 0,
                edgePadding: 110,
                controls: true
            },
            1230: {
                items: 3,
                gutter: 30,
                edgePadding: 79,
                fixedWidth: 328,
                controls: true
            }
        }
    });

    slider
        .getInfo()
        .slideItems[slider.getInfo().index].classList.add(
        "vl-slide-center"
    );
    slider
        .getInfo()
        .slideItems[slider.getInfo().index-1].classList.add(
        "vl-slide-prev"
    );
    slider.events.on("indexChanged", () => {
        const info = slider.getInfo();
        const indexCurr = info.index;
        const elements = document.getElementsByClassName("vl-slide-center");
        const elements2 = document.getElementsByClassName("vl-slide-prev");
        while (elements.length > 0) {
            elements[0].classList.remove("vl-slide-center");
        }
        while (elements2.length > 0) {
            elements2[0].classList.remove("vl-slide-prev");
        }
        info.slideItems[indexCurr - 1].classList.add("vl-slide-prev");
        info.slideItems[indexCurr].classList.add("vl-slide-center");
    });


    $('.open-popup-link').magnificPopup({
        type:'image',
        midClick: true
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    [].forEach.call( document.querySelectorAll('#order-phone'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });



    burger.click( (ev) => {
        burgerMenuWrapper.show();
        burgerHelps.show();
        return false;
    });

    popupClose.click( (ev) => {
        burgerMenuWrapper.hide();
        burgerHelps.hide();
        return false;
    });

    $(document).mouseup(function (e){ // событие клика по веб-документу
        const div1 = $(".burger-menu"); // тут указываем ID элемента
        const div2 = $(".burger-helps"); // тут указываем ID элемента
        if (!div1.is(e.target)
            && !div2.is(e.target)// если клик был не по нашему блоку
            && div1.has(e.target).length === 0
            && div2.has(e.target).length === 0) { // и не по его дочерним элементам
            burgerMenuWrapper.hide();
            burgerHelps.hide();
        }
    });


    jqMoreProjects.click( (ev) => {
        jqPiItem.removeClass('pi-hidden');
        jqMoreProjects.addClass('close-mp');
        jqLessProjects.removeClass('close-mp');

        amp.eq(0).show();
        amp.eq(1).show();
        amp.eq(2).show();

        return false;
    });

    jqLessProjects.click( (ev) => {
        jqPiItem.addClass('pi-hidden');
        jqMoreProjects.removeClass('close-mp');
        jqLessProjects.addClass('close-mp');
        amp.eq(0).hide();
        amp.eq(1).hide();
        amp.eq(2).hide();

        return false;
    });

    const loader = $('.loader');
    const orderSuccess = $('.order-success');

    $('#order-send').click( (ev) => {
        const jqName = $('#order-name');
        const jqPhone = $('#order-phone');
        const jqCB = $('#order-agree') ;
        const jqOrderLabel = $('#order-label') ;

        let errorFlag = false;

        if (!jqName.val()){
            jqName.siblings('.error-input').show();
            jqName.css('border-color', 'red');
            errorFlag = true;
        } else {
            jqName.css('border-color', 'rgb(255, 255, 255)');
            jqName.siblings('.error-input').hide();
        }

        if (!jqPhone.val()){
            jqPhone.siblings('.error-input').show();
            jqPhone.css('border-color', 'red');
            errorFlag = true;

        } else {
            jqPhone.css('border-color', 'rgb(255, 255, 255)');
            jqPhone.siblings('.error-input').hide();
        }

        if (!jqCB.prop('checked')) {
            jqOrderLabel.addClass('error-border');
            errorFlag = true;
        } else {
            jqOrderLabel.removeClass('error-border')
        }

        if (!errorFlag) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: 'https://testologia.site/checkout',
                data: { name: jqName.val(), phone: jqPhone.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        $('#order-form').hide();
                        $('.cons-text-order').hide();
                        orderSuccess.show();
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                })
        }

        return false;
    });

    $('.popup-close').click( (ev) => {
        regPopup.hide();
    });


    $('#reg-btn').click( (ev) => {
        regPopup.css('display', 'flex');

        $('#order-form2').show();
        $('#reg-popup-title').show();
        regSuccess.hide();

        $(document).mouseup(function (e){ // событие клика по веб-документу
            const div = $(".reg-popup-content"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                regPopup.hide(); // скрываем его
            }
        });

        $('#order-send2').click( (ev) => {
            const regName = $('#order-name2');
            const regPhone = $('#order-phone2');
            const regCB = $('#order-agree2') ;
            const regOrderLabel = $('#order-label2') ;

            let errorFlag = false;

            if (!regName.val()){
                regName.siblings('.error-input').show();
                regName.css('border-color', 'red');
                errorFlag = true;
            } else {
                regName.css('border-color', 'rgb(255, 255, 255)');
                regName.siblings('.error-input').hide();
            }

            if (!regPhone.val()){
                regPhone.siblings('.error-input').show();
                regPhone.css('border-color', 'red');
                errorFlag = true;

            } else {
                regPhone.css('border-color', 'rgb(255, 255, 255)');
                regPhone.siblings('.error-input').hide();
            }

            if (!regCB.prop('checked')) {
                regOrderLabel.addClass('error-border');
                errorFlag = true;
            } else {
                regOrderLabel.removeClass('error-border')
            }

            if (!errorFlag) {
                loader.css('display', 'flex');
                $.ajax({
                    method: "POST",
                    url: 'https://testologia.site/checkout',
                    data: { name: regName.val(), phone: regPhone.val()}
                })
                    .done(function (message) {
                        loader.hide();
                        if (message.success) {
                            $('#order-form2').hide();
                            $('#reg-popup-title').hide();
                            regSuccess.show();
                        } else {
                            alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                        }
                    })
            }
            return false;
        });
        return false;
    });
});

