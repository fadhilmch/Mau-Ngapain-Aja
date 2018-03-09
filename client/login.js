
$('#login_switch').click(function(){
    $('#signup_form').css('display','none')
    $('#login_form').css('display','block')
    
})

$('#signup_switch').click(function(){
    $('#login_form').css('display','none')
    $('#signup_form').css('display','block')
})

$('#login_switch').mousedown(function(){
    event.preventDefault();
})