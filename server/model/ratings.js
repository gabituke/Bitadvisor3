import { DataTypes } from 'sequelize'

const Ratings = (sequelize) => {
    const Schema = {
        rating: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }

    return sequelize.define('ratings', Schema)
}

export default Ratings