/**
 * Created by indika on 8/11/15.
 */
define(['flightConfig','helper/process_flight_search','xhr','helper/pusher.min'],function (flConfig,flightfrm,xhr,pusher) {
    var homePage = {};
    var tripType ="ONE_WAY"

    homePage.element = {
        travelMethods:$('.travel-method li'),
        homeTab:'#home-tabs a',
        menuBtn:'.menu-toggle',
        addHotel : '#add-hotel'



    }

    homePage.init = function() {
        this.bindEvent();

        $(this.element.slidetoggle).on('click',function(e){
            e.preventDefault();
            // create menu variables
            var slideoutMenu = $('nav');
            var mainContainer = $('.main-container');
            var slideoutMenuWidth = $('nav').width();

            // toggle open class
            slideoutMenu.toggleClass("open");
            mainContainer.toggleClass("pushed");
            // slide menu
            if (slideoutMenu.hasClass("open")) {
                slideoutMenu.css('right', -slideoutMenuWidth);
                mainContainer.animate({
                    right: slideoutMenuWidth
                });
            } else {
                slideoutMenu.animate({
                    right: "0px"
                });
                mainContainer.animate({
                    right: 0
                });
            }
        });
        $(this.element.travelMethods).on('click',function(e){
            var datVal = $(this).attr('data-value');
            $(this).addClass('active').siblings().removeClass('active');
            switch ($(this).index()) {
                case 0: //Return
                    tripType = "RETURN"
                    $('.returning-block').show();
                    //$('.from-block').addClass('col-sm-6 col-lg-6');
                    $('#frm-flight').addClass('form-return').removeClass('form-oneway form-multicity');
                    if ($(".flight-occurence-title").hasClass("active")) {
                        $('.flight-occurence-title').toggleClass('active inactive');
                    }
                    $('.checkout-block').hide();
                    $('div.add-hotel').show();
                    break;
                case 1: //One-way
                    tripType = "ONE_WAY"
                    $('.returning-block').hide(); //hide returning
                    //$('.from-block').removeClass('col-sm-6 col-lg-6');
                    $('#frm-flight').addClass('form-oneway').removeClass('form-return form-multicity');
                    if ($(".flight-occurence-title").hasClass("active")) {
                        $('.flight-occurence-title').toggleClass('active inactive');
                    }
                    $('.checkout-block').show();
                    $('div.add-hotel').hide();
                    document.getElementById('add-hotel').checked = false;
                    $('.hotel-field-section').slideUp();
                    break;
                case 2: //Multi-city
                    tripType = "MULTI_CITY"
                    $('.to-block').show(); //show returning
                    //$('.returning-block').hide(); //hide returning
                    //$('.from-block').addClass('col-sm-6 col-lg-6');
                    $('#frm-flight').addClass('form-multicity').removeClass('form-oneway form-return');
                    if ($(".flight-occurence-title").hasClass("inactive")) {
                        $('.flight-occurence-title').toggleClass('active inactive');
                    }
                    break;
            }
        });
        var url = flConfig.getEndPoint(flConfig.constant.AUTO_SUGGESTION_EP);
        var fromeDate,isTodateSelectable=false;
        var datePickerObj = {
            minDate: 0,
            numberOfMonths: 2,
            dateFormat : "yy-mm-dd",
            firstDay: 1,
            dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
            onSelect: function(){
                //isTodateSelectable = true
                fromeDate = new Date($(this).datepicker("getDate"));
                var month = parseInt(fromeDate.getMonth()+1);
                var dt = parseInt(fromeDate.getDate());
                fromeDate = fromeDate.getFullYear() + '-' + ((month<10)?'0'+month:month) + '-' +  ((dt<10)?'0'+dt:dt)

            },
            beforeShowDay : function(date){
                if ((date <= (new Date($('#flight-location-return-date').val()))) && (date >= (new Date($('#flight-location-from-date').val())))) {
                    return [true, 'ui-datepicker-highlights', ''];
                } else {
                    return [true, '', ''];
                }
            },
            "beforeShow": function(input, inst){
                $('.ui-datepicker').addClass('active');
                if (inst.dpDiv.position().top > $(input).position().top) {
                    inst.dpDiv
                        .removeClass('below')
                        .addClass('above');
                } else {
                    inst.dpDiv
                        .removeClass('above')
                        .addClass('below');
                }
            },
            'onClose': function() {
                $('.ui-datepicker').removeClass('active');
            }


        }
        $('#flights-location-from').autoSuggestions({requestURL:url,onKeyup:requestData});
        $('#both-location-to').autoSuggestions({requestURL:url,onKeyup:requestData});
        $('#both-location-from').autoSuggestions({requestURL:url,onKeyup:requestData});
        $('#flights-location-to').autoSuggestions({requestURL:url,onKeyup:requestData});
        $('#flight-location-from-date').datepicker(datePickerObj);
        $('#flight-location-return-date').datepicker(datePickerObj);
        $('#both-location-from-date').datepicker(datePickerObj);
        $('#both-location-return-date').datepicker(datePickerObj);
        $('#both-hotel-check-out-date').datepicker(datePickerObj);
        $('#hotel-check-in-date').datepicker(datePickerObj);
        $('#hotel-check-out-date').datepicker(datePickerObj);
        $('#flt-and-hotel-check-in-date').datepicker(datePickerObj);
        $('#flt-and-hotel-check-out-date').datepicker(datePickerObj);

        $('#dp1').dropdownPanel({data : flConfig.getUserTypes(),dropdownElement:flConfig.getCabinTypes(),btncpations:{"btnOk":"Choose","btnCancel":"Cancel"}});
        $('#dp2').dropdownPanel({data : flConfig.getUserTypes(),dropdownElement:flConfig.getCabinTypes(),btncpations:{"btnOk":"Choose","btnCancel":"Cancel"}});
        $('#dp3').dropdownPanel({data : flConfig.getUserTypes(),dropdownElement:flConfig.getCabinTypes(),btncpations:{"btnOk":"Choose","btnCancel":"Cancel"}});
        $("#dp4").dropdownPanel({data : flConfig.getUserTypes(),dropdownElement:flConfig.getCabinTypes(),btncpations:{"btnOk":"Choose","btnCancel":"Cancel"}});
        $('button[type="submit"]').click(function(e){
            e.preventDefault();
            flightfrm.setForm($(this).closest("form").attr('id'));
            //console.log(flightfrm.processFlightNHotelSearchForm(flConfig.constant))
            if($.isEmptyObject(flightfrm.getErrors(flConfig.errorMsg))) {
                $('.error-alert').hide();
                switch ($(this).closest("form").attr('id')){
                    case "frm-flight" :
                    var searchParams = {"search_params": JSON.stringify(flightfrm.processFlightSearchForm(flConfig.constant))}
                    xhr.request(flConfig.getEndPoint(flConfig.constant.FLIGHT_SEARCH_EP), searchParams, 'text', 'POST', getData)
                    break;
                    case "frm-both" :
                        var searchParams = {"search_params": JSON.stringify(flightfrm.processFlightNHotelSearchForm(flConfig.constant))}
                        console.log('++++++++++++++++++++++');
                        console.log(searchParams);
                        xhr.request(flConfig.getEndPoint(flConfig.constant.FLIGHT_SEARCH_EP), searchParams, 'text', 'POST', getData)
                        break;

                }
            }else{
                $('.error-alert').show();
                $('.error-alert ul li').remove();
                $('input[type="text"]').removeClass('error-field');

                $.each(flightfrm.getErrors(flConfig.errorMsg),function(key,val){
                    var msg = '<li>'+val+'</li>';
                    $('.error-alert ul').append(msg);
                    console.log(key)
                    $('input[name="'+key+'"]').addClass('error-field');
                })

            }


        })

        $('input[type="text"]').on('focus change paste keyup',function(){
            $(this).removeClass('error-field');
        })

    }
    homePage.bindEvent = function(){
        $('body').on('click',this.element.homeTab,function(e){
            e.preventDefault();
            $('.error-alert').hide();
            $(this).tab('show');
            if($(this).attr('aria-controls') == 'flights-hotels'){
                $('.checkout-block').hide();
            }else{
                $('.checkout-block').show();
            }

        })
        $('body').on('click',this.element.menuBtn,function(e){
                e.preventDefault();
                e.stopPropagation();
                // create menu variables
                var slideoutMenu = $('nav');
                var mainContainer = $('.main-container');
                var slideoutMenuWidth = $('nav').width();

                // toggle open class
                slideoutMenu.toggleClass("open");
                mainContainer.toggleClass("pushed");
                // slide menu
                if (slideoutMenu.hasClass("open")) {
                    slideoutMenu.css('right', -slideoutMenuWidth);
                    mainContainer.animate({
                        right: slideoutMenuWidth
                    });

                } else {
                    slideoutMenu.animate({
                        right: "0px"
                    });
                    mainContainer.animate({
                        right: 0
                    });
                }

            })
        $('body').on('change',this.element.addHotel,function(){
            $('.hotel-field-section').slideToggle();
        })


    }

    var getData = function(data){
        var pusher = new Pusher('7410655bec6591276808', {
            encrypted: true
        });
        var channel = pusher.subscribe('search-results');

        channel.bind('pusher:subscription_succeeded', function(data) {
            console.log(data)
            alert(data);
            //alert('jjjjj');
        });
        Pusher.log = function(message) {
            if (window.console && window.console.log) window.console.log(message);
        };

    }

    var requestData = function(){

        //xhr.request("http://ytlocal.yatango.com.au/engine/public/flight/air-ports/name/ala", null, 'text', 'GET', getData);
    }


    return homePage;
});