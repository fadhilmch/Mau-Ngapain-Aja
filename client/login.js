
$('#login_switch').click(function () {
    $('#signup_form').css('display', 'none')
    $('#login_form').css('display', 'block')

})

$('#signup_switch').click(function () {
    $('#login_form').css('display', 'none')
    $('#signup_form').css('display', 'block')
})

$('#login_switch').mousedown(function () {
    event.preventDefault();
})

$('#signup_button').click(function () {
    if ($('#password_signup').val() !== $('#re_password_signup').val()) {
        alert('Password not match');
    } else {
        axios.post('http://localhost:3000/register/', {
            name: $('#full_name_signup').val(),
            email: $('#email_signup').val(),
            password: $('#password_signup').val()
        })
            .then(function (response) {
                window.location.href = 'login.html'
            })
            .catch(function (error) {
                console.log(error);
                // window.location.href = 'login.html'
            });

    }
})

$('#login_button').click(function () {
    axios.post('http://localhost:3000/login/', {
        email: $('#email_signin').val(),
        password: $('#password_signin').val()
    })
        .then(function (response) {
            localStorage.setItem('token', response.data.user.token);
            window.location.href = 'index.html'
        })
        .catch(function (error) {
            console.log(error);
        });

})