import { useLazyQuery } from "@apollo/client"
import { QUERY_GET_EPISODES } from "../../services/graphql/query"
import {
	Box,
	Grid,
	Button,
	Spacer
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

const EpisodesPage = () => {
	const [getEpisodes, { data, loading }] = useLazyQuery(QUERY_GET_EPISODES, {
		notifyOnNetworkStatusChange: true
	})

	const [page, setPage] = useState(1)

	useEffect(() => {
		getEpisodes({
			variables: {
				page
			}
		})
	}, [page])

	if (loading) return (<div>LOADING</div>)

    if (!data.episodes.results.length) return (<Box>Sem resultados</Box>)

	return (
		<Grid templateColumns='repeat(5, 1fr)' gap={2} padding={5}>
			{data?.episodes?.results?.map((item) => (
				<Box
					key={item.id}
					maxW='sm'
					borderWidth='1px'
					borderRadius='lg'
					overflow='hidden'>
					<Box p='4'>
						<Box
							mt='1'
							fontWeight='semibold'
							as='h4'
							lineHeight='tight'
							noOfLines={2}>
							{item.name}
						</Box>
						<Box fontSize='sm'>{item.episode}</Box>
					</Box>
				</Box>
			))}
			<Box w={"100%"} display={"flex"} gap={2} alignItems='center' mt={4}>
				<Box w={"100%"} fontSize='sm' fontWeight={"bold"} textTransform='uppercase'>
					Results: {data?.episodes?.info?.count}
				</Box>
				<Spacer />
				<Button
					colorScheme='teal'
					disabled={page <= 1}
					onClick={() => setPage((previous) => previous - 1)}>
					Prev
				</Button>
				<Button
					colorScheme='teal'
					onClick={() => setPage((previous) => previous + 1)}>
					Next
				</Button>
			</Box>
		</Grid>
	)
}

export default EpisodesPage
