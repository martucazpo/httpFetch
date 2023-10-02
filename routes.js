let db = require("./db")
let url = require("url")
const functions = require("./functions")

module.exports = (req, res) => {

    req.params = {}
    req.query = {}

    if (req.method === 'GET' && req.url === "/todos/getall") {
        let taskStr = ""
        let tasks = db.map(todo => {
            return (
                `<li>
                    <div>
                        <div>${todo.task}</div>
                        <div>
                            <button onclick="handleDelete(${todo.id.toString()})">DELETE</button>
                            <button onclick="prepareToEdit(${todo.id.toString()})">EDIT</button>
                        </div>
                    </div>
                </li>`
            )
        })
        tasks.forEach(task => taskStr += task)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(JSON.stringify(taskStr))
    }
    if (req.method === 'GET' && url.parse(req.url, true).pathname === "/todos/prepareforedit") {
        functions.getQuery(req)
        let taskStr = ""
        let tasks = db.map(todo => {
            if (todo.id === req.query.id) {
                return (
                    `<li>
                        <div>
                            <form method="PUT" onsubmit="handleEdit(event, ${todo.id.toString()}); return false">
                                <label for="task">Task to change:</label>
                                <input type="text" name="task" id="task" value="${todo.task}" required />
                                <button type="submit">CHANGE</button>
                            </form>
                        </div>
                    </li>`
                )
            } else {
                return (
                    `<li>
                    <div>
                        <div>${todo.task}</div>
                        <div>
                            <button onclick="handleDelete(${todo.id.toString()})">DELETE</button>
                            <button onclick="prepareToEdit(${todo.id.toString()})">EDIT</button>
                        </div>
                    </div>
                </li>`
                )
            }
        })
        tasks.forEach(task => taskStr += task)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(JSON.stringify(taskStr))
    }

    if (req.method === 'DELETE' && req.url.endsWith("/delete")) {
        functions.getParams(req)
        db = db.filter(item => item.id !== req.params.id)
        let taskStr = ""
        let tasks = db.map(todo => {
            return (
                `<li>
                    <div>
                        <div>${todo.task}</div>
                        <div>
                            <button onclick="handleDelete(${todo.id.toString()})">DELETE</button>
                            <button onclick="prepareToEdit(${todo.id.toString()})">EDIT</button>
                        </div>
                    </div>
                </li>`
            )
        })
        tasks.forEach(task => taskStr += task)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(JSON.stringify(taskStr))
    }
    if (req.method === "PUT" && url.parse(req.url, true).pathname === "/todos/edit") {
        functions.getBody(req)
        db = db.map(todo => {
            if (todo.id === req.body.id) {
                todo.task = req.body.task
            }
            return todo
        })
        let taskStr = ""
        let tasks = db.map(todo => {
            return (
                `<li>
                   <div>
                       <div>${todo.task}</div>
                       <div>
                           <button onclick="handleDelete(${todo.id.toString()})">DELETE</button>
                           <button onclick="prepareToEdit(${todo.id.toString()})">EDIT</button>
                       </div>
                   </div>
               </li>`
            )
        })
        tasks.forEach(task => taskStr += task)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(JSON.stringify(taskStr))
    }
    if (req.method === "POST" && url.parse(req.url, true).pathname === "/todos/add") {
        functions.getBody(req)
        db = [req.body, ...db]
        let taskStr = ""
        let tasks = db.map(todo => {
            return (
                `<li>
                   <div>
                       <div>${todo.task}</div>
                       <div>
                           <button onclick="handleDelete(${todo.id.toString()})">DELETE</button>
                           <button onclick="prepareToEdit(${todo.id.toString()})">EDIT</button>
                       </div>
                   </div>
               </li>`
            )
        })
        tasks.forEach(task => taskStr += task)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(JSON.stringify(taskStr))
    }
}