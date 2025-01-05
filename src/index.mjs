import express from "express";

const app = express();

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
]

app.get("/api/users", (req, res) => {
    res.send(mockUsers)
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

