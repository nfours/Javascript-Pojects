/**
 * Created by indika on 7/22/15.
 */
(function($){
    var elId = 1;
    var dtaobj = {};
    var drpDownInputTxt = {};




    //custom auto suggesion text box
    $.fn.autoSuggestions = function( options ) {
        var text
        elId += 1;

        var _this = this;
        var settings = $.extend({
            // These are the defaults.
            color: "#000000",
            backgroundColor: "#FFFFFF",
            requestURL:"#",
            dropletBackColor:"#FFFFFF",
            onKeyup : function(data){
            },
            onChange : function(ele){}
        }, options );
        $(_this).attr('id','auto-sug-input'+elId);
        $(_this).parent().append('<div class="auto-sug-drop" id="auto-sug'+elId+'"/>').show();
        $('#auto-sug'+elId).css({'background-color':settings.dropletBackColor});

        var isValidSearch = function(txt){
            if(txt != '' && txt.length >= 3 ){
                return true;
            }else{
                return false;
            }
        }
        var showSuggestions = function(data){
            //data.split(text)
            $(_this).parent().find('.auto-sug-drop').show();
            $(_this).parent().find('.auto-sug-drop ul').remove();
            var elementId = $(_this).attr('id');
            var obj = JSON.parse(data)
            $(_this).parent().find('.auto-sug-drop').append('<ul></ul>')
            $.each( obj, function( key, value ) {
                var li = '<li data-location-id="'+value.code+'"><label for="'+elementId+'">'+value.name+'</label></li>';
                $(_this).parent().find('.auto-sug-drop ul').append(li)
            })
        }

        $('body').click(function(e) {
            if($(e.target).closest('.auto-sug-drop').length <= 0) {
                $('.auto-sug-drop').hide();
            }

        });


        $('body').on('click','#auto-sug'+elId+' ul li',function(e){
            //e.stopPropagation();
            var selected = $(this).find('label').attr('for');
            $('#'+selected).val($(this).text());
            $('#'+selected).attr('data-location-id',$(this).data('location-id'));
            settings.onChange(this);
            hidSuggestions();
        })
        var hidSuggestions = function (){
            $(_this).parent().find('.auto-sug-drop').hide();
        }
        var getSuggestions = function (e) {
            text = $(this).val().toLowerCase();
            if(isValidSearch(text) && e.which != 32) {
                if(xhr && xhr.readystate != 4){
                    xhr.abort();
                }
                var url = settings.requestURL+text
                var xhr = $.ajax({
                    url:url,
                    dataType: "text",
                    type: "GET",
                    success: function(data) {
                        settings.onKeyup.call();
                        showSuggestions(data)
                    }

                })
            }
        }

        this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        }).on(
            "keyup", getSuggestions
        ).on(
            "click",hidSuggestions
        )

        return this

    }
    //-----end auto suggestion----------

    //custom drop down------------------
    $.fn.dropdownPanel =function (options){
        var _this = this;
        var output = {}


        elId += 1;
        drpDownInputTxt[elId] = new Array();
        $(_this).find('input.dd-input').attr('id',"dd-input-"+ elId)
        var settings = $.extend({
            data : [{'caption':'Adult','maxVal':'10','default':'1'},{'caption':'Children','maxVal':'10','defaultcount':'0'}],
            dropdownElement : {"P" :   "Premium First class cabin","F" :   "First class cabin."},
            btncpations : {"btnOk":"OK","btnCancel":"CANCEL"}
        },options);

        var listElement = function (obj,data,inc){
            /*if(data != undefined){
                var data = $(_this).data('controller-value');
            }*/
            //.replace( /^\D+/g, '')
            var val = 0;
            if(data != undefined){
                if(data.length > 1) {
                    var d = data[inc];
                    if(d != undefined) {
                        val = d.replace(/^\D+/g, '');
                        if(val.indexOf(":") > -1){
                            val = val.split(':')[1];
                        }
                    }else{
                        val = obj.defaultcount;
                    }
                }else{
                    val = obj.defaultcount;
                }
            }
            var el = '<li class="row"><div class="label"><label class="caption">'+obj.caption+'</label></div><div class="dd-row-wrapper"><div class="dec btn"  data-default="' + obj.defaultcount + '">&#45;</div><div class="txt"><input type="text" value="'+val+'" /></div><div class="inc btn" data-max="' + obj.maxVal + '">&#43;</div></div></li>'
            return el;

        }
        var renderDDBox = function (arr){
            var select = $('<select/>');

            $.each (arr ,function(key,value){
                var opt = $('<option value="'+key+'">'+value+'</option>');
                select.append(opt)
            })
            return select;
        }

        var renderDDPanel = function(){
            //var data = ($(_this).attr('data-controller-value') != undefined) ? JSON.parse($(_this).attr('data-controller-value')) : {} ;
            $(_this).toggleClass('active');
            var inc = 0;
            var id = $('input',_this).attr('id');
            $('.dropDown-pannel').remove();


            $(_this).append('<div class="dropDown-pannel" id="dd-panel-'+id.replace( /^\D+/g, '')+'" />');
                var selectOption = renderDDBox(settings.dropdownElement);
                $('.dropDown-pannel').append('<div class="dd-option-wrapper"></div>')
                $('.dd-option-wrapper').append('<label class="dd-label">Class</label>');
                $('.dd-option-wrapper').append(selectOption);
                $('.dropDown-pannel select').selectmenu({
                    "maxHeight":300,
                    open: function( event, ui ) {
                        $('.ui-selectmenu-menu').css({'z-index':'9999999',width:'100px'});
                        $('.ui-selectmenu-menu ul').css({width:$('.ui-selectmenu-text').outerWidth()});
                    },
                    change: function( event, ui ) {
                        //$('.dropDown-pannel select').trigger('change');
                    },
                    select: function(){
                        $('.dropDown-pannel select').trigger('change');
                    }
                });

                var panel = $('<ul class="controll-panel"/>');
                $('.dropDown-pannel').append(panel)
                var btnPanel = $('<div class="dd-btn-Warpper"><button type="button" class="btn-cancel">'+settings.btncpations.btnCancel+'</button><button type="button" class="btn-ok">'+settings.btncpations.btnOk+'</button><div>')
                $('.dropDown-pannel').append(btnPanel)
                $.each(settings.data,function(key,value){
                    inc += 1;
                    /*if(data[value.caption] == undefined){
                        data[value.caption] = 0;
                    }*/
                    var li = listElement (value,drpDownInputTxt[id.replace( /^\D+/g, '')],inc);
                    panel.append(li);
                })


            //$(_this).attr('data-controller-value',JSON.stringify(data));
            //dtaobj = {};


        }
        $('body').click(function(e) {
            if ($(e.target).closest('.dropDown-wrapper').length <= 0) {
                if($(e.target).closest('.ui-selectmenu-menu').length <= 0) {
                    $('.dropDown-pannel').hide();
                    $('.dropDown-wrapper').removeClass('active');
                }
            }

        });


        $('body').on('change','.dropDown-pannel .dd-option-wrapper select',function(e){
            //e.stopPropagation();
            var id = $(this).parent().parent().attr('id')
            drpDownInputTxt[id.replace( /^\D+/g, '')][0] = $('option:selected',this).text();
            //drpDownInputTxt [0] = $('option:selected',this).text();
            $('#dd-input-'+id.replace( /^\D+/g, '')).attr('data-id',$('option:selected',this).attr('value'));
            $('#dd-input-'+id.replace( /^\D+/g, '')).val(drpDownInputTxt[id.replace( /^\D+/g, '')].join(','));

        })
        $('body').on('click','#dd-panel-'+elId +' ul li .dd-row-wrapper .inc',function(e){
            //e.stopPropagation();

            var max = $(this).data('max');
            var id = $(this).parent().parent().parent().parent().attr('id')
            var currentVal = (drpDownInputTxt[id.replace( /^\D+/g, '')] != undefined)?drpDownInputTxt[id.replace( /^\D+/g, '')][$(this).parent().parent().index()+1] : undefined;
            var count =  (currentVal != undefined) ? currentVal.replace( /^\D+/g, '') : 0;

            if(isNaN(count)) {

                if (count.indexOf(":") > -1) {
                    count = Number(count.split(':')[1]);
                }
            }else{
                    count = Number(count);
            }

            var caption = $(this).parent().parent().find('.label .caption').text();

            if(count<max){
                count += 1;
                $(this).parent().parent().find('.txt input').val(count);
                dtaobj[caption] = count;
                //$('#dd-panel-'+elId).parent().attr('data-controller-value',JSON.stringify(dtaobj));
                //drpDownInputTxt [$(this).parent().index()+1] = caption + ":" + count;
                drpDownInputTxt[id.replace( /^\D+/g, '')][$(this).parent().parent().index()+1] = caption + ":" + count;

                $('#dd-input-'+id.replace( /^\D+/g, '')).val(drpDownInputTxt[id.replace( /^\D+/g, '')].join(','));


            }
        })

        $('body').on('click','#dd-panel-'+elId +' ul li .dd-row-wrapper .dec',function(e){
            //e.stopPropagation();

            var max = $(this).data('max');
            var id = $(this).parent().parent().parent().parent().attr('id');

            var currentVal = (drpDownInputTxt[id.replace( /^\D+/g, '')] != undefined)?drpDownInputTxt[id.replace( /^\D+/g, '')][$(this).parent().parent().index()+1] : undefined;
            var count =  (currentVal != undefined) ? currentVal.replace( /^\D+/g, '') : 0;
            if(isNaN(count)) {
                if (count.indexOf(":") > -1) {
                    count = count.split(':')[1];
                }
            }else{
                count = Number(count);
            }
            var caption = $(this).parent().parent().find('.label .caption').text();

            if(count>0){
                count -= 1;

                if(count == 0 && $(this).data('default') == 1){
                    count = 1;
                }

                $(this).parent().parent().find('.txt input').val(count);
                dtaobj[caption] = count;
                //$('#dd-panel-'+elId).parent().attr('data-controller-value',JSON.stringify(dtaobj));
                //drpDownInputTxt [$(this).parent().index()+1] = caption + ":" + count;
                drpDownInputTxt[id.replace( /^\D+/g, '')][$(this).parent().parent().index()+1] = caption + ":" + count;;
                $('#dd-input-'+id.replace( /^\D+/g, '')).val(drpDownInputTxt[id.replace( /^\D+/g, '')].join(','));

            }
        })
        this.find('.btn').on('click',function(e){
            //e.stopPropagation();
            $('.dropDown-pannel').remove();
            //$('.dropDown-wrapper').removeClass('active');
            if($(_this).hasClass('active')) {
                $(_this).removeClass('active')
                delete dtaobj.index;
                //drpDownInputTxt.length = 0;



            }else{
                renderDDPanel();

            }

            })
        this.find('input[type="text"]').on('click',function(e){
            //e.stopPropagation();
            //$('.dropDown-pannel').remove();
            //$('.dropDown-wrapper').removeClass('active');
            if($(_this).hasClass('active')) {
                $(_this).removeClass('active')
                delete dtaobj.index;
                //drpDownInputTxt.length = 0;
                $('.dropDown-pannel').hide();


            }else{
                var inputval = $(this).parent().find('input[type="text"]').val()
                //drpDownInputTxt = inputval.split(',');
                //$('.dropDown-pannel').hide();
                renderDDPanel();
            }

        })

        return this;

    }
    //-------end of drop down-----------
 })(jQuery);
