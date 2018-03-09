var currentListId = "";

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
axios.get('http://localhost:3000/',{
    headers: {token: localStorage.getItem('token')}
})
  .then(function (response) {

  })
  .catch(function (error) {
    window.location.href = 'login.html'
  });

function getList() {
    $('#list').empty();
    axios.get('http://localhost:3000/lists')
        .then((response) => {
            response.data.data.forEach(list => {
                $('#list').append(`
                    <li>

                    <a style="display: inline-block;" href="#" onclick="getTodo('${list._id}')">${list.title}</a>


                    <button class="right" style="
                    background:none;
                    outline: none;
                    border:none;"

                    onclick="sendEmail('${list._id}')">
                        <i class="material-icons side_bar_icons_edit">email</i>
                    </button>

                    <button class="right" style="
                    background:none;
                    outline: none;
                    border:none;"

                    onclick="postFacebook('${list._id}')">
                        <i class="material-icons side_bar_icons_edit">send</i>
                    </button>


                    <button class="right" style="
                    background:none;
                    outline: none;
                    border:none;"

                    onclick="deleteList('${list._id}')">
                        <i class="material-icons side_bar_icons_edit">delete</i>
                    </button>

                    </li>

                `)
            })
        })
}

// function emailDialog(){
//     $('.modal').modal();
//     $('#modal2').modal('open');
// }

function dialogAddList(idList){
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

function deleteList(id){
    axios.delete(`http://localhost:3000/lists/${id}`)
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

            $('#todo').empty();
            response.data.data.todo.forEach(todo => {
                let checkBox = false;
                let active = "";
                if(todo.status == false){
                    checkBox = `<i class="material-icons">crop_square</i>`
                    active = "";
                }
                else{
                    checkBox = `<i class="material-icons">check_box</i>`
                    active = 'disabled';
                }
                let starred = false;
                if(todo.starred == false){
                    starred = `<i class="material-icons">star_border</i>`
                }
                else{
                    starred = `<i class="material-icons">star</i>`
                }

                let templatePrintTodo = `
                    <div class=row>
                    <button ${active} style="
                    background:none;
                    outline: none;
                    border:none;"
                    onclick="changeToDone('${todo._id}')">
                        ${checkBox}
                    </button>

                        ${todo.text}

                        <button class="right" style="
                        background:none;
                        outline: none;
                        border:none;"
                        onclick="toggleStarred('${todo._id}',${todo.starred})">
                            ${starred}
                        </button>

                        <button class="right" style="
                        background:none;
                        outline: none;
                        border:none;"
                        onclick="deleteTodo('${todo._id}')">
                            <i class="material-icons side_bar_icons_edit">delete</i>
                        </button>


                    </div>
                `
                $('#todo').append(templatePrintTodo)
            })
            currentListId = idList;
            console.log(response.data.data.todo);
        })
}

function toggleStarred(id, star){
    axios.put(`http://localhost:3000/todos/${id}`, {
        starred: !star
    })
        .then(response => {
            getList()
            getTodo(currentListId)
        })
}

function changeToDone(id){
    // console.log("masuk")
    axios.put(`http://localhost:3000/todos/${id}`, {
        status: true
    })
        .then(response => {
            getList()
            getTodo(currentListId)
        })
}

getList();


function defaultOff(){

}

function sendEmail(id){
    console.log(id)
    swal({
        title: "Good job! Check Your Email Bro",
        icon: "success",
      }).then(data=>{
        axios.post(`http://localhost:3000/todos/sendemail/${id}`)
            .then(response => {
                console.log("Sent")
                window.location.href = index.html
            })
            .catch(error => {
                console.log(error)
            })
        })

}

function postFacebook(id){
    swal({
        title: "Good job! Check Facebook bro",
        icon: "success",
      }).then(data=>{
        axios.get(`http://localhost:3000/todos/addtimeline/${id}`,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
            .then(response => {
                window.location.href = index.html
            })
            .catch(error => {
    
            })
      });
}
