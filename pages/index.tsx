import Head from 'next/head'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import type { Movies } from '../types'

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      title
      tagline
      released
    }
  }
`
export default function Home() {
  const { loading, error, data } = useQuery<{ movies: Movies }>(GET_MOVIES)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="container">
      <main>
        <div className="movies">
          <div className="subtitle">
            <p>
              <strong>"Movies"</strong> Neo4j example dataset.
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Movie Title</th>
                <th>Released</th>
                <th>Tagline</th>
              </tr>
            </thead>
            <tbody>
              {data.movies.map((movie, index) => (
                <tr className="movie" key={movie.title}>
                  <th>{index + 1}</th>
                  <td>
                    <Link
                      href="/movie/[title]"
                      as={{
                        pathname: `/movie/${encodeURIComponent(movie.title)}`,
                      }}
                      legacyBehavior
                    >
                      <a className="link">{movie.title}</a>
                    </Link>
                  </td>
                  <td>{movie.released}</td>
                  <td>{movie.tagline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>


      <style jsx>{`
        .container {
          width: 100vw;
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          display: flex;
          width: 100%;
        }
        .subtitle {
          margin-bottom: 25px;
          text-align: center;
        }
        .movies {
          flex: 1;
          padding: 0 5rem;
        }

        table {
          width: 100%;
          border: 1px solid #dee2e6;
          border-collapse: collapse;
          border-spacing: 2px;
        }

        table thead th {
          vertical-align: middle;
          border-bottom: 2px solid #dee2e6;
          border: 1px solid #dee2e6;
          border-bottom-width: 2px;
          padding: 0.75rem;
        }

        table tbody th,
        table tbody td {
          border: 1px solid #dee2e6;
          padding: 0.75rem;
          vertical-align: middle;
        }

        .link {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
