import movies from '../movies.json' with { type: 'json' }

export class MovieModel {

    static getAll = async ({ genre }) => {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }
}