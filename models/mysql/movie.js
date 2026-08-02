import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

// forma no recomendada por call backs (callbacks hell)
/*
connection.query('SELECT ...', (err, results) => {
    ✖️
    })
*/

export class MovieModel {
    static async getAll ({ genre }) {
        const result = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )

        console.log(result)
    }

    static async getById ({ id }) {
        
    }

    static async create ({input}) {
       
    }

    static async delete ({ id }) {
        
    }

    static async update ({ id, input }) {
        
    }
}