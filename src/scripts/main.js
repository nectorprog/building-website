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

    regSuccess.hide();
    burgerMenuWrapper.hide();
    burgerHelps.hide();



    const slider = tns({
        container: ".slider",
        mode: "carousel",
        items: 3,
        gutter: 30,
        edgePadding: 79,
        slideBy: 1,
        center: true,
        fixedWidth: 328,
        controlsPosition: 'bottom',
        navPosition: 'bottom',
        navAsThumbnails: true,
        autoplay: false,
        autoplayButtonOutput: false,
        controlsContainer: "#custom-control"


        // slideBy: "page",
        // nav: false,
        // speed: 500,
        // responsive: {
        //     320: {
        //         items: 1,
        //         gutter: 10,
        //         touch: true,
        //         mouseDrag: true,
        //         controls: false
        //     },
        //     900: {
        //         items: 3,
        //         touch: true,
        //         gutter: 20,
        //         mouseDrag: true,
        //         controls: true
        //     }
        // }
    });

    slider
        .getInfo()
        .slideItems[slider.getInfo().index].classList.add(
        "vl-slide-center"
    );
    slider.events.on("indexChanged", () => {
        const info = slider.getInfo();
        const indexCurr = info.index;
        const elements = document.getElementsByClassName("vl-slide-center");
        while (elements.length > 0) {
            elements[0].classList.remove("vl-slide-center");
        }
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

        return false;
    });

    jqLessProjects.click( (ev) => {
        jqPiItem.addClass('pi-hidden');
        jqMoreProjects.removeClass('close-mp');
        jqLessProjects.addClass('close-mp');

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

