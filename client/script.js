var currentListId = "";

function logout(){
    localStorage.clear()
    window.location.href = 'login.html'
}

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
    // window.location.href = 'login.html'
  });

function getList() {
    $('#list').empty();
    axios.get('http://localhost:3000/lists')
        .then((response) => {
            response.data.data.forEach(list => {
                $('#list').append(`
                    <li><a href="#" onclick="getTodo('${list._id}')">${list.title}</a></li>
                `)
            })
        })
}

function dialogAddList(){
    $('.modal').modal();
    $('#modal1').modal('open');
}

function deleteTodo(id){
    axios.delete(`http://localhost:3000/todos/${id}`)
        .then(response => {
            getList()
            getTodo(currentListId)
        })
}



function addList() {
    axios.post('http://localhost:3000/lists', {
        title:$('#new_list').val()
    })
        .then(response => {
            getList()
        })
}

$('#add_todo').keypress(key => {
    if(key.which == 13){

        addTodo($('#add_todo').val());
        $('#add_todo').val("");
    }
});

function addTodo(todo){
    axios.post(`http://localhost:3000/todos/${currentListId}`, {
        text:todo
    })
        .then(response => {
            getList()
            getTodo(currentListId)
        })
}

function getTodo(idList) {
    axios.get(`http://localhost:3000/lists/${idList}`)
        .then(response => {
            console.log(response)
            $('#todo').empty();
            response.data.data.todo.forEach(todo => {

                $('#todo').append(`
                    <div class=row>
                    <a href = "" onclick='changeToDone('todo._id')'>
                        <i class="material-icons">crop_square</i>
                    </a>
                        ${todo.text}

                        <a onclick='toggleStarred('todo._id')'>
                            <i class="side_bar_icons_edit material-icons">star_border</i>
                        </a>

                        <a href='#'>
                            <i class="material-icons side_bar_icons_edit">delete</i>
                        </a>


                    </div>
                `)
            })
            currentListId = idList;
            console.log(response.data.data.todo);
        })
}

function toggleStarred(){
    console.log('Starred')
}

function changeToDone(id){
    axios.put(`http://localhost:3000/todos/${id}`, {
        status: true
    })
        .then(response => {
            console.log(id + " done")
            getList()
            getTodo(currentListId)
        })
}

getList();


function defaultOff(){

}
