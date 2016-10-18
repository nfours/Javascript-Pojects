/**
 * Created by indika on 8/6/15.
 */
define(
    ['helper/process_form_data'],
    function(form){
        var flightData = {},
            key;

        for (key in form) {
            if (form.hasOwnProperty(key)) {
                flightData[key] = form[key];
            }
        }

        flightData.processFlightSearchForm = function (config) {
            // override method on the clone, access to super through super_moduleMethod
            var formData = form.getFormData(),adultCount,childCount,infantCount;
            var flight =  {},tripType="OneWay";
            $("#flights .travel-method li").each(function(){
                if($(this).hasClass('active')){
                    tripType = $(this).data('trip-type');
                }
            })
            if((formData != undefined)) {
                flight["search_type"] = "flight";
                flight["triptype"] = tripType;
                flight["cabin"] = String(formData[config.FLIGHT_CABIN_TYPE_ID]);
                flight["segment_count"] = 1;
                flight['segment1'] = {}
                flight['segment1']['from'] = formData[config.FLIGHT_FROM_LOCATION_ID];
                flight['segment1']['to'] = formData[config.FLIGHT_TO_LOCATION_ID];
                flight['segment1']['from_text'] = formData[config.FLIGHT_FROM_LOCATION];
                flight['segment1']['to_text'] = formData[config.FLIGHT_TO_LOCATION];
                flight['segment1']['departuredatetime'] = formData[config.FLIGHT_DEPARTURE_DATE] + "T11:00:00";

                if (tripType == "Return") {
                    flight["segment_count"] = 2;
                    flight['segment2'] = {}
                    flight['segment2']['from'] = formData[config.FLIGHT_TO_LOCATION_ID];
                    flight['segment2']['to'] = formData[config.FLIGHT_FROM_LOCATION_ID];
                    flight['segment2']['from_text'] = formData[config.FLIGHT_TO_LOCATION];
                    flight['segment2']['to_text'] = formData[config.FLIGHT_FROM_LOCATION];
                    flight['segment2']['departuredatetime'] = formData[config.FLIGHT_RETURN_DATE] + "T11:00:00";
                } else if (tripType == "MultiCity") {// This part will be changed
                    flight["segment_count"] = 1;
                    flight['segment1'] = {}
                    flight['segment1']['from'] = formData[config.FLIGHT_FROM_LOCATION_ID];
                    flight['segment1']['to'] = formData[config.FLIGHT_TO_LOCATION_ID];
                    flight['segment1']['from_text'] = formData[config.FLIGHT_FROM_LOCATION];
                    flight['segment1']['to_text'] = formData[config.FLIGHT_TO_LOCATION];
                    flight['segment1']['departuredatetime'] = formData[config.FLIGHT_DEPARTURE_DATE] + "T11:00:00";
                }

                if(formData[config.FLIGHT_CABIN_TYPE] != undefined) {
                    var cabindata = formData[config.FLIGHT_CABIN_TYPE].split(',');
                    flight["adults"] = adultCount = (cabindata[1] != undefined) ? Number(cabindata[1].split(':')[1]) : 1;
                    flight["children"] = childCount = (cabindata[2] != undefined) ? Number(cabindata[2].split(':')[1]) : 0;
                    flight["infants"] = infantCount = (cabindata[3] != undefined) ? Number(cabindata[3].split(':')[1]) : 0;
                    flight["seats"] = adultCount + childCount;
                }
            }



            return flight;
        };

        flightData.processFlightNHotelSearchForm = function (config) {
            var formData = form.getFormData(),adultCount,childCount,infantCount;
            var hotelNflightData = {},tripType="OneWay";
                $("#flights-hotels .travel-method li").each(function(){
                if($(this).hasClass('active')){
                    tripType = $(this).data('trip-type');
                }
            })
            if((formData != undefined)) {
                hotelNflightData["search_type"] = "both";
                hotelNflightData["triptype"] = tripType;
                hotelNflightData["segment_count"] = 1;
                hotelNflightData['segment1'] = {}
                hotelNflightData['segment1']['from'] = formData[config.FLIGHT_N_HOTEL_FROM_LOCATION_ID];
                hotelNflightData['segment1']['to'] = formData[config.FLIGHT_N_HOTEL_TO_LOCATION_ID];
                hotelNflightData['segment1']['from_text'] = formData[config.FLIGHT_N_HOTEL_FROM_LOCATION];
                hotelNflightData['segment1']['to_text'] = formData[config.FLIGHT_N_HOTEL_TO_LOCATION];
                hotelNflightData['segment1']['departuredatetime'] = formData[config.FLIGHT_N_HOTEL_DEPARTURE_DATE] + "T11:00:00";

                if (tripType == "Return") {
                    hotelNflightData["segment_count"] = 2;
                    hotelNflightData['segment2'] = {}
                    hotelNflightData['segment2']['from'] = formData[config.FLIGHT_N_HOTEL_FROM_LOCATION_ID];
                    hotelNflightData['segment2']['to'] = formData[config.FLIGHT_N_HOTEL_TO_LOCATION_ID];
                    hotelNflightData['segment2']['from_text'] = formData[config.FLIGHT_N_HOTEL_FROM_LOCATION];
                    hotelNflightData['segment2']['to_text'] = formData[config.FLIGHT_N_HOTEL_TO_LOCATION];
                    hotelNflightData['segment2']['departuredatetime'] = formData[config.FLIGHT_N_HOTEL_DEPARTURE_DATE] + "T11:00:00";
                }


                if (formData[config.FLIGHT_N_HOTEL_CABIN_TYPE] != undefined) {
                    var cabindata = formData[config.FLIGHT_N_HOTEL_CABIN_TYPE].split(',');
                    hotelNflightData["adults"] = adultCount = (cabindata[1] != undefined) ? Number(cabindata[1].split(':')[1]) : 1;
                    hotelNflightData["children"] = childCount = (cabindata[2] != undefined) ? Number(cabindata[2].split(':')[1]) : 0;
                    hotelNflightData["infants"] = infantCount = (cabindata[3] != undefined) ? Number(cabindata[3].split(':')[1]) : 0;
                    hotelNflightData["seats"] = adultCount + childCount;
                }

                hotelNflightData["hotel_for_part"] = 0;
                hotelNflightData["check_out"] = formData[config.HOTEL_CHECKOUT];
                hotelNflightData["cabin"] = formData[config.FLIGHT_N_HOTEL_CABIN_TYPE_ID];

                if (tripType == "Return" && formData[config.ADD_HOTELS_WITH_FLIGHTS]) {

                    hotelNflightData["hotel_dates"] = {};
                    if(formData[config.HOTEL_ROOM_TYPE] !=undefined) {
                        var roomdata = formData[config.HOTEL_ROOM_TYPE].split(',');
                        hotelNflightData["hotel_dates"]["adults"] = adultCount = (roomdata[1] != undefined) ? Number(roomdata[1].split(':')[1]) : 1;
                        hotelNflightData["hotel_dates"]["children"] = childCount = (roomdata[2] != undefined) ? Number(roomdata[2].split(':')[1]) : 0;
                        hotelNflightData["hotel_dates"]["infants"] = infantCount = (roomdata[3] != undefined) ? Number(roomdata[3].split(':')[1]) : 0;
                        hotelNflightData["hotel_dates"]["rooms"] = adultCount + childCount;
                    }
                    hotelNflightData["hotel_dates"]["check_in"] = formData[config.HOTEL_CHECKING];
                    hotelNflightData["hotel_dates"]["check_out"] = formData[config.HOTEL_CHECKOUT];
                    hotelNflightData["hotel_for_part"] = 1;
                }
            }

            return hotelNflightData;



        }

        return flightData;


    }
)

/*
 {
 "search_type":"flight",
 "triptype":"OneWay",
 "cabin":"Y",
 "seats":"2",
 "adults":"2",
 "children":"",
 "infants":"",
 "segment_count":"1",
 "segment1":{
 "from":"ISB",
 "from_text":"",
 "to":"LHR",
 "to_text":"",
 "departuredatetime":"2015-11-25T00:00:00"
 }
 }

 {
 flt-from:"Sahand Airport",
 flt-to:"Suvarnabhumi International",
 flt-depart:"08/19/2015",
 flt-return:"08/12/2015",
 flt-cabin-type:"Premium Business class cabin,Adult:3,Children:3,Infant:3"
 }

 */


//hotel and flight

//        'search_params: '
//        . '"{"search_type":"both",'
//                . '"triptype":"Return",'
//                . '"segment_count":2,'
//                . '"segment1":'
//                . '{"from":"LCY","to":"HND","from_text":"London City","to_text":"Tokyo, Japan - Haneda Airport","departuredatetime":"2015-09-30T11:00:00"},'
//                . '"segment2":'
//                . '{"from":"HND","to":"LCY","from_text":"Tokyo, Japan - Haneda Airport","to_text":"London City","departuredatetime":"2015-10-13T11:00:00"},'
//                . '"adults":2,'
//                . '"children":0,'
//                . '"infants":0,'
//                . '"seats":2, '
//                . '"hotel_for_part": 1, '
//                . '"hotel_dates": {"check_in": "2015-10-05T11:00:00", "check_out": "2015-10-10T11:00:00", "adults" : 2, "children": 1, "infants": 1, "rooms" : 1}}'