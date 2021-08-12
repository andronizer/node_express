const express = require('express')
const userRouter = require('./app/routes/user.routes')
const app = express()
const PORT = process.env.PORT || 8080
const db = require('./app/db')

const { sequelize } = require('./app/db')

app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, async () => {
    console.log(`server started on port ${PORT}`)
    await sequelize.authenticate()
    // await sequelize.sync()
})

