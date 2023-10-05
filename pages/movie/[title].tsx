import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import type { Movies } from '../../types'

const GET_MOVIE = gql`
  query GetMovie($movieTitle: String) {
    movies(where: { title: $movieTitle }) {
      tagline
      released
  }
  }
`

export default function Movie() {
  const router = useRouter()
  const { title } = router.query
  const { loading, error, data } = useQuery<{ movies: Movies }>(GET_MOVIE, {
    variables: { movieTitle: title },
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="container">
      <main>
        <div className="movie">
          <div className="info">
            <h2>Information</h2>
            <div>
              <strong>Tagline: </strong>
              {data.movies[0].tagline}
            </div>
            <div>
              <strong>Released: </strong>
              {data.movies[0].released}
            </div>
          </div>
          <div className="directors">
          </div>
        </div>
        <div className="back">
          <Link href="/" legacyBehavior>
            <a>🔙 Go Back</a>
          </Link>
        </div>
      </main>
      <style jsx>
        {`
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
            justify-content: center;
            padding: 2rem 0;
            text-align: center;
            flex-direction: column;
          }
          .movie {
            margin-bottom: 2rem;
          }
          .back {
            padding: 1rem 0;
          }
          .back a {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  )
}
