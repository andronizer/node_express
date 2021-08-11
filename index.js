const express = require('express')
const userRouter = require('./routes/user.routes')
const app = express()
const PORT = process.env.PORT || 8080
const db = require('./db')

app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

