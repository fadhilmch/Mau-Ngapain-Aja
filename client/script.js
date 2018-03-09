function getList () {
    $.ajax({
        url: 'http://localhost:3000/lists',
        method: 'GET',
        dataType: 'JSON',
        success: (response) => {
            populateList(response);
        }
    })
}

function populateList(data) {
    $('#list').empty();
    if(data.data.length>0){
        data.data.forEach(list => {
            $('#list').append(`
                <li><a href="getTodo()">${list.title}</a></li>
            `)
        });
    }

}

function getTodo() {
    console.log("halo")
}

getList();
