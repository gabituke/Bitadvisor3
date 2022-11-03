import express from 'express'
import db from '../database/connect.js'
import { placesValidator } from '../middleware/validate.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {


        // const options = {
        //     include: [
           
        //         {
        //             model: db.Ratings,
        //             attributes: ['rating']
        //         }
        //     ],
        //     attributes: {
        //         include: [
        //             [Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'total_rating']
        //         ]
        //     },
        //     group: ['id']
        // }

       

     




        const places = await db.Places.findAll()
        res.json(places)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', async (req, res) => {
    try {
        const place = await db.Places.findByPk(req.params.id)
        res.json(place)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

// Router.get('/single/:id', async (req, res) => {
//     try {
//         const place = await db.Places.findByPk(req.params.id, {
//             include: {
//                 model: db.Ratings,
//                 include: db.Users
//             }
//         })
//         res.json(place)
//     } catch {
//         res.status(500).send('Įvyko serverio klaida')
//     }
// })

Router.post('/new', placesValidator, async (req, res) => {
    try {
        await db.Places.create(req.body)
        res.send('Salonas sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', placesValidator, async (req, res) => {
    try {
        const place = await db.Places.findByPk(req.params.id)
        await place.update(req.body)
        res.send('Salonas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const place = await db.Places.findByPk(req.params.id)
        await place.destroy()
        res.send('Salonas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router