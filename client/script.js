function logout(){
    localStorage.clear()
    window.location.href = 'login.html'
}


$('#test').click(function(){
    const a = $('.span').text()
    axios.get('http://localhost:3000/users/timeline',{
        headers: {token: localStorage.getItem('token'),content:a}
    })
    .then((response)=>{
        console.log('hello')
    })
    .catch(err=>{
        console.log(err)
    })
})  

$('#submitMailgun').click(function(){
    const text = $('#inputList').val()
    console.log(text)
})



// Axios Client Goes Here
axios.get('http://localhost:3000',{
    headers: {token: localStorage.getItem('token')}
})
  .then(function (response) {

  })
  .catch(function (error) {
    window.location.href = 'login.html'
  });


function getList() {
    axios.get('http://localhost:3000/lists')
        .then((response) => {
            response.data.data.forEach(list => {
                $('#list').append(`
                    <li><a href="#" onclick="getTodo('${list._id}')">${list.title}</a></li>
                `)
            })
        })
}

function getTodo(idList) {
    axios.get(`http://localhost:3000/lists/${idList}`)
        .then(response => {
            $('#todo').empty();
            response.data.data.todo.forEach(todo => {
                $('#todo').append(`
                    <div class=row><a href="#"><i class="material-icons side_bar_icons_edit">crop_square</i></a>${todo.text}</div>
                `)
            })
        })
}

getList();


function defaultOff(){

}
