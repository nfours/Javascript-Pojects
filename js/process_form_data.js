/**
 * Created by indika on 8/5/15.
 */
define(function(){
    var formData = {}
    var formid;

    var validateFormData = function(error){
        var errorObj = {}
        if(formid != undefined) {
            $('#' + formid).find('input').each(function (index) {
                if ($(this).is(":text")) {
                    var txt = $(this).val()
                    console.log($(this).closest(".form-group").parent().is(':visible'))
                    if ($(this).prop('required') && !txt.trim() && $(this).closest(".form-group").parent().is(':visible')) {
                        errorObj[$(this).attr('name')] = error[$(this).attr('name')];
                    } else if ($(this).attr('name') != undefined) {
                        if($(this).attr('name').indexOf('email') > -1) {
                            var regx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            if (!regx.test($(this).val())) {
                                errorObj[$(this).attr('name')] = "Please Enter a valide email"
                            }
                        }
                    }
                }
            })
        }
        return errorObj;

    }

    var processData = function(){
        var frmObj = {};
        if(formid != undefined) {
            $('#' + formid).find('input').each(function (index) {
                if($(this).is( ":text" ) ){
                    frmObj[$(this).attr('name')] = $(this).val();
                    if ($.hasData(this)) {
                        var data = $(this).data();
                        for (var key in data) {
                            var dataId = key;
                            var dataVal = data[key];
                        }
                        frmObj[$(this).attr('name') + '-' + dataId] = dataVal;
                    }
                }else if($(this).is( ":checkbox" )){
                    frmObj[$(this).attr('name')] = $(this).prop("checked");
                }

            })
        }
        return frmObj;
    }

    formData.setForm = function(id){
        formid = id;
    }
    formData.getForm = function(){
        return formid;
    }
    formData.getFormData = function(){
        return processData();
    }
    formData.getErrors = function(errorobj){
        return validateFormData(errorobj);
    }
    return formData;
})
