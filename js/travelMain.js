/**
 * Created by indika on 7/22/15.
 */


require(
    ['jQuery','bootstrap','jQueryUI','prgUI','home_view','list_view'],
    function($,bootstrap,jQueryUI,gUI,homeView,listView){
    var page = {
        init : function(){
            this.element = {
                page:$(window),
                document:$(document),
            }
            this.bindEvent();
            homeView.init();
            // added by nilu
        },
        bindEvent : function(){
        }

    }
    $(function(){
        page.init();
    })
});
