const express = require('express')
const userRouter = require('./app/routes/user.routes')
const app = express()
const PORT = process.env.PORT || 8080
const db = require('./app/db')

app.use(express.json())
app.use('/api', userRouter)

const init = async (force = false) => {
    try {
        await db.sequelize.sync({force});
        await db.sequelize.authenticate();

        app.listen(PORT, async () => {
            console.log(`server started on port ${PORT}`)
        })
    
    } catch (error) {
        console.log('db problem');
    }
}

init();


