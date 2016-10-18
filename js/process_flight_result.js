/**
 * Created by indika on 8/14/15.
 */
define(function () {
    var flightData = {},data={};

    flightData.setFlightData = function(data){
        data = JSON.stringify(data);
    }

    flightData.processData = function (){
        if(data != undefined){
            $.each(data,function(key,value){

            })
        }
    }

    return flightData;
});