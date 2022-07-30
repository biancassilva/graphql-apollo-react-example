import { gql } from "@apollo/client"

export const QUERY_GET_CHARACTERS = gql`
query characters ($page: Int, $filter: FilterCharacter) {
  characters (page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
      }
      created
      __typename
    }
  }
}
`
