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
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            // get genre id's from database table using genre names
            const [genre] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) =?;', [lowerCaseGenre]
            )

            // interpolacion ?, []
            // en C: %s, 'string'
            // not `${not}` sql inyection
            // asi solo es un string que no se puede evaluar ni tomar como una query(consulta)

            // no genre found
            if (genres.length === 0) return []

            // get the id from the first genre result
            const [{ id }] = genres

            /// get all movies ids from database table
            // la query a movie_genres
            // join
            // and return results...
            return []
        }

        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )

        return movies
    }

    static async getById ({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if (movies.legth === 0) return null

        return movies[0]
    }

    static async create ({input}) {
       
        const {
        genre: genreInput,
        title,
        year,
        duration,
        director,
        rate,
        poster
       } = input

       const [uuidResult] = await connection.query('SELECT UUID() uuid;')
       const [{ uuid }] = uuidResult

       try {
            await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
            )
        } catch (e) {
            // puede enviarle informacion sensible
            throw new Error('Error creating movie')
            // enviar la traza a un servicio interno
            // sendLog(e) - envio de registro
        }

       const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid]
       )

       return movies[0]
    }

    static async delete ({ id }) {
        // exercises create delete
        // CRUD
    }

    static async update ({ id, input }) {
        // exercises create update
    }
}