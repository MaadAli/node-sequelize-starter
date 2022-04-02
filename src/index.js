import app from "./server"
import config from './config/config'


app.listen(config.port, () => {
    console.log("Server is listening on port "+ config.port)
})