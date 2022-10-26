import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)
    
    let message = ''

    if(error) {
        switch(error.details[0].path[0]) {
            case 'username': 
                message = 'Neteisingai nurodyta pavardė'
                break
            case 'email': 
                message = 'Neteisingai nurodytas el. pašto adresas'
                break
            case 'password':
                message = 'Neteisingai nurodytas slaptažodis'
                break
            default:
                message = 'Neteisingai užpildyti laukeliai'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}

export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required()
    })

    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}




export const placesValidator = (req, res, next) => {
    const schema = Joi.object({
        description: Joi.string().min(2).required(),
        title: Joi.string().min(2).required(),
        photo: Joi.string().required()
    })

    validate(schema, req, res, next)
}

export const ratingsValidator = (req, res, next) => {
    const schema = Joi.object({
        rating: Joi.number().required(),
        photo: Joi.string().allow(''),
        comment: Joi.string().allow('')
    })

    validate(schema, req, res, next)
}


export default validate