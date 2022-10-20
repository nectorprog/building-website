$('.open-popup-link').magnificPopup({
    type:'image',
    midClick: true
});

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
        // centerMode: true,
        // centerPadding: '60px'
    });

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

    const jqPiItem = $('.pi-item-more');
    const jqMoreProjects = $('#more-projects');
    const jqLessProjects = $('#less-projects');

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
    })
});

