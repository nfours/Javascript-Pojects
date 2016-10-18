
define(function(){
 var flightConfigarations ={
    constant:{
        "FLIGHT_FROM_LOCATION" : "flt-from",
        "FLIGHT_TO_LOCATION" : "flt-to",
        "FLIGHT_FROM_LOCATION_ID" : "flt-from-locationId",
        "FLIGHT_TO_LOCATION_ID" : "flt-to-locationId",
        "FLIGHT_DEPARTURE_DATE" : "flt-depart",
        "FLIGHT_RETURN_DATE" : "flt-return",
        "FLIGHT_CABIN_TYPE_ID" : "flt-cabin-type-id",
        "FLIGHT_CABIN_TYPE":"flt-cabin-type",
        "FLIGHT_SEARCH_EP" : "flsep",
        "AUTO_SUGGESTION_EP" : "asep",
        "FLIGHT_N_HOTEL_FROM_LOCATION":"flt-and-hotel-from",
        "FLIGHT_N_HOTEL_TO_LOCATION":"flt-and-hotel-to",
        "FLIGHT_N_HOTEL_FROM_LOCATION_ID" : "flt-and-hotel-from-locationId",
        "FLIGHT_N_HOTEL_TO_LOCATION_ID" : "flt-and-hotel-to-locationId",
        "FLIGHT_N_HOTEL_DEPARTURE_DATE":"flt-and-hotel-depart",
        "FLIGHT_N_HOTEL_RETURN_DATE":"flt-and-hotel-return",
        "FLIGHT_N_HOTEL_CABIN_TYPE":"flt-and-hotel-cabin-type",
        "FLIGHT_N_HOTEL_CABIN_TYPE_ID":"flt-and-hotel-cabin-type-id",
        "HOTEL_CHECKING":"hotel-checkin",
        "HOTEL_CHECKOUT":"hotel-checkout",
        "HOTEL_ROOM_TYPE":"hotel-room-type",
        "ADD_HOTELS_WITH_FLIGHTS":"add-hotel"

    },
    cabinTypes : {
        "P" :   "Premium First class cabin",
        "F" :   "First class cabin" ,
        "J" :   "Premium Business class cabin",
        "C" :   "Business class cabin",
        "S" :   "Premium Economy class cabin",
        "Y" :   "Economy class cabin"

    },
    userType :  [
                {'caption':'Adult','maxVal':'10','defaultcount':'1'},
                {'caption':'Children','maxVal':'10','defaultcount':'0'},
                {'caption':'Infants(<2)','maxVal':'5','defaultcount':'0'}
                ],
    errorMsg :{
        'flt-from':'Departure airport was not found. Please check your spelling of departure airport',
        'flt-to':'Arrival airport was not found. Please check your spelling of arrival airport',
        'flt-depart':'Derparting date is missing',
        'flt-return':'Return date is missing',
        'flt-cabin-type':'Cabin class and number of passengers required',
        'flt-and-hotel-from':'Departure airport was not found.',
        'flt-and-hotel-to':'Arrival airport was not found.',
        'flt-and-hotel-depart':'Derparting date is missing',
        'flt-and-hotel-return':'Return date is missing',
        'flt-and-hotel-cabin-type':'Cabin class and number of passengers required'
    },
    autoSugestionEndPoint : "/travel/flight/destinations/" ,
    flightSearchEndPoint : "/travel/flight/searchresults" ,
    getCabinTypes : function(){
        return flightConfigarations.cabinTypes;
    },
    getUserTypes : function(){
        return flightConfigarations.userType;
    },
    getEndPoint : function(type){
        var endpoint;
        var _this = this;
        switch (type){
            case this.constant.AUTO_SUGGESTION_EP :
                endpoint = flightConfigarations.autoSugestionEndPoint;
                break;
            case this.constant.FLIGHT_SEARCH_EP :
                endpoint = flightConfigarations.flightSearchEndPoint;
                break;

        }
        return endpoint;
    }
}

    return  {
            'getCabinTypes':flightConfigarations.getCabinTypes,
            'getUserTypes': flightConfigarations.getUserTypes,
            'getEndPoint' : flightConfigarations.getEndPoint,
            'constant' : flightConfigarations.constant,
            'errorMsg' : flightConfigarations.errorMsg
            }

})
/*
 triptype =>
 <!-- Value="OneWay" One-way trip. -->
 <!-- Value="Return" (default) Round-trip. -->
 <!-- Value="Circle" Circle trip. -->
 <!-- Value="OpenJaw" Open jaw trip. -->
 <!-- Value="Other" Complex trip. -->


 Cabin="P" is a Premium First class cabin.
 -->
 <!-- Cabin="F" is a First class cabin. -->
 <!--
 Cabin="J" is a Premium Business class cabin.
 -->
 <!--
 Cabin="C" is a Business class cabin.
 -->
 <!--
 Cabin="S" is a Premium Economy class cabin.
 -->
 <!--
 Cabin="Y" is a Economy class cabin.
 -->
 */