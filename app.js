const express = require('express')
const userRouter = require('./app/routes/user.routes')
const dashboardRouter = require('./app/routes/dashboard.routes')
const taskRouter = require('./app/routes/task.routes')
const app = express()
const config = require('./config/config')
const PORT = config.port || 8080
const db = require('./app/db')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', dashboardRouter)
app.use('/api', taskRouter)

const init = async () => {
    try {
        await db.sequelize.authenticate();

        app.listen(PORT, async () => {
            console.log(`server started on port ${PORT}`)
        })
    
    } catch (error) {
        console.log(error);
    }
}

init();


