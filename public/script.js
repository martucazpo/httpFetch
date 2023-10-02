const makeList = (str) => {
    let list = document.getElementById("listUl")
    list.innerHTML = ""
    list.innerHTML = str
}

const api = async (url = "", method = "") => {
    await fetch(url, {method})
    .then(res => res.json())
    .then(data => makeList(data))
}

const getFetch = () =>{
    api("/todos/getall", "GET")
}

const prepareToEdit = (id) => {
    api(`/todos/prepareforedit?id=${id}`,"GET")  
}

const addTask = async (e) => {
    e.preventDefault()
    let id = Math.ceil(Math.random() * 900000000)
    let task = e.target.children[1].value
    e.target.children[1].value = ""
    api(`/todos/add?id=${id}&&task=${task}`,"POST")
}

const handleDelete = async (id) => {
    api(`/todos/${id}/delete`,'DELETE')
}

const handleEdit = async (e, id) => {
    e.preventDefault()
    let task = e.target.children[1].value
    api(`/todos/edit?id=${id}&&task=${task}`,"PUT")
}

document.addEventListener("DOMContentLoaded", ()=>getFetch())




