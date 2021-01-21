
const { DataTypes } = require('sequelize')

module.exports = async sequelize => {

	try {
		await sequelize.authenticate()
	} catch (error) {
		console.log(error)
		return new Error('Database connection error, wait one moment...')
	}

	return sequelize.define('Accounts', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING({ length: 32 })
		},
		password: {
			type: DataTypes.TEXT
		},
		token: {
			type: DataTypes.TEXT,
			defaultValue: ''
		},
		coins: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: 'accounts',
	})
}