$(document).ready(function(){
//    bouncefix.add('body');
    
//    if($.fn.niceScroll){
//        $("body").niceScroll();    
//    }
    
    
    /* center modal */
    function centerModals(){
      $('.modal').each(function(i){
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
      });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);

    
    /* fancy box */    

    //JackyLee 2015-04-14
    //temporary disable tnc & privacy policy link until it is provided by client
//    $('.docs a, .subscribe a,footer .socials li:nth-child(2) a').on('click', function() {
//        return false; 
//    });
    
    if($('.fancybox').length){
        if(!$.fn.fancybox){
            alert('fancybox init failed! developer properly forget to include necessary .js');   
        }
        $('.fancybox').fancybox();   
    }
    
    if($('section.subscribe').length){
        if(!$.fn.bootstrapValidator){
            alert('bootstrapValidator init failed! developer properly forget to include necessary .js');   
        }
        if(!bootbox){
            alert('bootbox init failed! developer properly forget to include necessary .js');   
        }
        
        $ct = $('section.subscribe');
        $ct.find('form').bootstrapValidator({
            feedbackIcons : {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields:{
                'subscribe-email':{
                    validators: {
                        notEmpty: {
                            message: 'Please Enter Your Email'   
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) { 
            console.log('success.form.bv');
            e.preventDefault();
            var $form = $(e.target);

            var $bv = $form.data('bootstrapValidator');
            $data = {}
            $data['email'] = $form.find('#subscribe-email').val();
//                if(!isDev) {
            if(1){

                $.post($form.attr('action'), $data, function(result) {
                    // ... Process the result ...
                    if(result.error_exist){
                        bootbox.alert('Fail to submit : ' + result.error_message);
                    }else{
                        var bb = bootbox.confirm ('Thank for your subscription.', function(){});
                        $form.data('bootstrapValidator').resetForm ();
                        $form[0].reset();
                        setTimeout(function(){ bootbox.hideAll(); }, 5000);
                    }
                }, 'json').fail(function(jqXHR, textStatus, errorThrown){
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    bootbox.alert('Fail to submit : ' + errorThrown);
                });
            }else{
                var bb = bootbox.alert('Successfully sumbitted.');
                $form.data('bootstrapValidator').resetForm ();
                $form[0].reset();
                setTimeout(function(){ bootbox.hideAll(); }, 5000);
            }
        }).on('error.form.bv', function(e){
            var $form = $(e.target);
            var largeform = $(window).width() >= 992;
            if(largeform){
                $('.help-block').remove();
            }
        }).on('error.field.bv', function(e){
            var $form = $(e.target);
            var largeform = $(window).width() >= 992;
            if(largeform){
                $('.help-block').remove();
            }
        });
        
    }
    
    if($('#project1,#project2,#project3,#project4').length){
        $ct = $('#project1,#project2,#project3,#project4');  
        
        if(!$.fn.bootstrapValidator){
            alert('bootstrapValidator init failed! developer properly forget to include necessary .js');   
        }
        if(!bootbox){
            alert('bootbox init failed! developer properly forget to include necessary .js');   
        }
        
        $ct.find('form').each(function(i){
            $form = $(this);
            
            var _section_index = parseInt($form.attr('id').split('-')[1]);
            var _fields = {}
            _fields[('register-'+_section_index+'-name')] = {
                validators: {
                    notEmpty: {
                        message: 'Please Enter Your Name'
                    }
                }
            };
            _fields[('register-'+_section_index+'-contact')] = {
                validators: {
                    notEmpty: {
                        message: 'Please Enter Your Contact No'
                    }
                }
            };
            _fields[('register-'+_section_index+'-email')] = {
                validators: {
                    notEmpty: {
                        message: 'Please Enter Your Email'
                    }
                }
            };
            _fields['register-'+_section_index+'-agree'] = {
                validators: {
                    notEmpty: {
                        message: 'Agreement is required for Submit'   
                    }
                }
            }
            
            $form.bootstrapValidator({
                feedbackIcons : {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields:_fields
            }).on('success.form.bv', function(e) { 
                console.log('success.form.bv');
                e.preventDefault();
                var $form = $(e.target);
                var section_index = parseInt($form.attr('id').split('-')[1]);

                var $bv = $form.data('bootstrapValidator');
                $data = {}
                $data['project'] = $form.attr('data-project');
                $data['name'] = $form.find('#register-'+section_index+'-name').val();
                $data['contact'] = $form.find('#register-'+section_index+'-contact').val();
                $data['email'] = $form.find('#register-'+section_index+'-email').val();
//                if(!isDev) {
                if(1){

                    $.post($form.attr('action'), $data, function(result) {
                        // ... Process the result ...
                        if(result.error_exist){
                            bootbox.alert('Fail to submit : ' + result.error_message);
                        }else{
                            var bb = bootbox.confirm ('Successfully submitted.', function(){});
                            $form.data('bootstrapValidator').resetForm ();
                            $form[0].reset();
                            setTimeout(function(){ bootbox.hideAll(); }, 5000);
//                            var projectId = queryDict.projectId || 1;
//                            window.open('thankyou.html?projectId='+projectId, '_self');
                        }
                    }, 'json').fail(function(jqXHR, textStatus, errorThrown){
                        $form.data('bootstrapValidator').disableSubmitButtons(false);
                        bootbox.alert('Fail to submit : ' + errorThrown);
                    });

                }else{
                    var bb = bootbox.alert('Successfully sumbitted.');
                    $form.data('bootstrapValidator').resetForm ();
                    $form[0].reset();
                    setTimeout(function(){ bootbox.hideAll(); }, 5000);
//                    window.open('thankyou.html', '_self');
                }
            }).on('error.form.bv', function(e){
                var $form = $(e.target);
                var largeform = $(window).width() >= 992;
                if(largeform){
                    $('.help-block').remove();
                }
            }).on('error.field.bv', function(e){
                var $form = $(e.target);
                var largeform = $(window).width() >= 992;
                if(largeform){
                    $('.help-block').remove();
                }
            });
            $form.on('reset', function(){
                $form.data('bootstrapValidator').resetForm ();
            });
        });
    }
});