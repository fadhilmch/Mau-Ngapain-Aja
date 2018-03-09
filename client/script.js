function logout(){
    localStorage.clear()
    window.location.href = 'login.html'
}

// Axios Client Goes Here
axios.get('http://localhost:3000/',{
    headers: {token: localStorage.getItem('token')}
})
  .then(function (response) {

  })
  .catch(function (error) {
    window.location.href = 'login.html'
  });
