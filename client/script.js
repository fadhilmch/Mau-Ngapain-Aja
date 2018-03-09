function getList () {
    $.ajax({
        url: 'http://localhost:3000/list',
        method: 'get',
        dataType: 'JSON',
        success: (response) => {
            populateList(response);
        }
    })
}

function populateList(data) {
    $('#list').empty();
    data.forEach(list => {
        $('#list').append(`
            <li><a href="">${list.title}</a></li>
        `)
    });
}

getList();
