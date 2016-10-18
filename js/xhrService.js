/**
 * Created by indika on 7/22/15.
 */
var xhr = (function($){
    var rest;
    var token = $('input[name="_token"]').val();

    request = function (url,data,dataType,type,callBack){
        console.log(data);
        if(rest && rest.readystate != 4){
            rest.abort();
        }
        rest = $.ajax({
            url:url,
            dataType: dataType,
            type: type,
            data:data,//{ //'X-CSRF-Token': $('meta[name=_token]').attr('content') },
            beforeSend: function(xhr){
                displayOverlay();
                xhr.setRequestHeader('X-CSRF-Token', token);
            },
            error: function(err) {
                hideOverlay();
                console.log(err.statusText);
                $('.error-alert').show();
                $('.error-alert ul li').remove();
                var msg = '<li>'+err.statusText+'</li>';
                $('.error-alert ul').append(msg);

            },
            success: function(data) {
                hideOverlay();
                callBack(data)
            }

        })
    }
    var displayOverlay = function(){
        $('.preloader').show();
    }
    var hideOverlay = function(){
        $('.preloader').hide();
    }
    return {'request':request};
})(jQuery);



