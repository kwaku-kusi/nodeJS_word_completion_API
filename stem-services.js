const express = require("express")
const axios = require('axios').default

const dict = []

const getDictionary = (url) => {
    return new Promise((resolve, reject)=>{
        axios.get(url).then((response)=>{
            const words = response.data.trim().split('\r\n')

            for (let word of words){
                dict.push(word)
            }

            console.log(words)
            resolve(words)
        }).catch((error)=>{
            reject(error)
        })
    })
}

const createService = () => {
    const app = express()

    const dictionaryURL = "https://raw.githubusercontent.com/qualified/challenge-data/master/words_alpha.txt";

    app.get('/', async (req, res)=>{

        if (dict.length < 1){
            console.log("are we here")
            await getDictionary(dictionaryURL)
        }
        
        if (req.query.stem){
            let prefix = req.query.stem
            const newList = dict.filter((word)=> word.startsWith(prefix))
            return res.json({data: newList})
        }
        res.json({data: dict})
    })

    return app
}

module.exports = {createService}