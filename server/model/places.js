import { DataTypes } from 'sequelize'

const Places = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }

    return sequelize.define('places', Schema)
}

export default Places