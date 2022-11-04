import { DataTypes } from 'sequelize'

const Ratings = (sequelize) => {
    const Schema = {
        rating: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        }
    }

    return sequelize.define('ratings', Schema)
}

export default Ratings