import express, { response } from "express";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    // res.send("Hi") // html
    // res.send({msg: "Hi"}) // json
    res.status(201).send({msg: "Hi"}) // headers
})

const mockUsers = [
    {id: 1, username: "collin", displayName: "Collin"},
    {id: 2, username: "jimmy", displayName: "Jimmy"},
    {id: 3, username: "hope", displayName: "Hope"},
    {id: 4, username: "joe", displayName: "Joe"},
    {id: 5, username: "jane", displayName: "Jane"},
    {id: 6, username: "jake", displayName: "Jake"},
    {id: 7, username: "jill", displayName: "Jill"},
]

app.get("/api/users", (req, res) => {
    console.log(req.query)
    const {query: {filter, value}} = req
    // when filter and value are undefined
    if(filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)))
    return res.send(mockUsers)
})

// post req
app.post("/api/users", (req, res) => {
    const {body} = req
    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...body}
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

// Route params
app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id)

    if(isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid id"})
    }

    const findUser = mockUsers.find((user) => user.id === parsedId)

    if(!findUser) {
        return res.status(404).send('User not found')
    }

    return res.send(findUser)
})

app.get("/api/products", (req, res) => {
    res.send([
        {id: 123, name: "chicken sandwich", price: 5.99},
        {id: 124, name: "ham sandwich", price: 8.99}
    ])
})

app.put("/api/users/:id", (req, res) => {
    const {body, params:{id}} = req

    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return response.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

    if(findUserIndex === -1) return response.sendStatus(404)
    mockUsers[findUserIndex] = {id: parsedId, ...body}
    return res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// query params
// example - localhost:3000/api/users?name=collin
// example - localhost:3000/products?key=value&key2=value2


