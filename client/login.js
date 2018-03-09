
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

axios.post('htt')

name:String,
email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password:String,
facebook_id:String,
list:[{
    type: Schema.Types.ObjectId,
    ref:'List'
}],