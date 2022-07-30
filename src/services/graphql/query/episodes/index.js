import { gql } from "@apollo/client"

export const QUERY_GET_EPISODES = gql`
	query episodes($page: Int, $filter: FilterEpisode) {
		episodes(page: $page, filter: $filter) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				air_date
				episode
				characters {
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
					created
					__typename
				}
			}
		}
	}
`
