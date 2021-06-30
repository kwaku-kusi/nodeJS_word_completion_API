const { createService } = require("./stem-services")

const app = createService()

app.listen(5000, ()=>{
    console.log("App running at http://localhost:5000")
})