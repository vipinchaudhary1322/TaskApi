const express = require('express');
const mongoose = require('mongoose');
const todoData = require('./inventory')
const app = express();


app.use(express.json())

//mogodb connection
mongoose.connect("mongodb://localhost:27017/todolist", (err) => {
        console.log(err)
        if (!err) {
                console.log("db connected")
        }
        else {
                console.log("error")
        }
})



//routes
//test case 1
app.post("/v1/tasks", async (req, res) => {
        var task = req.body;
        if (task.tasks) {
                res.send({
                        task:
                                task.tasks.map((data) => {
                                        todoData.create({ title: data.title, is_completed: false }).then((result) => {
                                                return ({ "id": result })
                                        })
                                })
                })
        }
        else {
                let x = await todoData.create({ title: req.body.title, is_completed: false }).then((result) => {
                        res.status(201).send({ "id": result._id })
                })
        }
        console.log(task)
})

//test case 2
app.get("/v1/tasks", async (req, res) => {
        var alltasks = await todoData.find().then((response) => {
                res.status(200).send({ "tasks": response })
        })
        console.log(alltasks)
})



//test case 3
app.get("/v1/tasks/:id", async (req, res) => {
        var getuniquetask = await todoData.find({ _id: req.params.id }).then((response) => {
                if (response) {
                        res.status(200).send({ id: response[0]._id, title: response[0].title, is_completed: response[0].is_completed })
                }
        }).catch((err) => {
                res.status(404).send({ "error": "There is no task at that id" })
        })
})


//test case 4 and 7


app.delete("/v1/tasks/:id", async (req, res) => {
        if (req.body) {
                let data = req.body;
                data.tasks.map(async (item) => {
                        let x = await todoData.findOneAndDelete({ _id: item.id }).then((response) => {

                        })
                })
                res.status(204).send("")
        }
        else {
                let del = await todoData.findOneAndDelete({ _id: req.params.id }).then((response) => {
                        res.status(204)
                })
        }
})


//test case 5

app.put("/v1/tasks/:id", async (req, res) => {

        let change = todoData.findOneAndReplace({ _id: req.params.id }, { "title": req.body.title, is_completed: req.body.is_completed }).then((response) => {
                res.send(response)
        }).catch((err) => {
                res.status(404).send({
                        error: "There is no task at that id"
                }
                )
        })
})



//port

app.listen(8000, (err) => {
        if (!err) {
                console.log("port started at 8000");
        }
        else {
                console.log(err)
        }
})


