import { useLazyQuery } from "@apollo/client"
import { QUERY_GET_CHARACTERS } from "../../services/graphql/query"
import {
	Box,
	Image,
	Badge,
	Grid,
	Button,
	Spacer,
	Spinner
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

const CharactersPage = () => {
	const [getCharacters, { data, loading }] = useLazyQuery(QUERY_GET_CHARACTERS, {
		notifyOnNetworkStatusChange: true
	})

	const [page, setPage] = useState(1)

	useEffect(() => {
		getCharacters({
			variables: {
				page
			}
		})
	}, [page])

	if (loading)
		return (
			<Box
				w={"100vw"}
				h={"100vh"}
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='teal'
					size='xl'
				/>
			</Box>
		)

	return (
		<Grid templateColumns='repeat(5, 1fr)' gap={2} padding={5}>
			{loading && (
				<Box
					w={"100vw"}
					h={"100vh"}
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='teal'
						size='xl'
					/>
				</Box>
			)}
			{data?.characters?.results?.map((item) => (
				<Box
					key={item.id}
					maxW='sm'
					borderWidth='1px'
					borderRadius='lg'
					overflow='hidden'>
					<Image src={item.image} />
					<Box p='4'>
						<Box display='flex' alignItems='baseline'>
							<Badge borderRadius='full' px='2' colorScheme='teal' size={"xs"}>
								{item.species}
							</Badge>
						</Box>
						<Box
							mt='1'
							fontWeight='semibold'
							as='h4'
							lineHeight='tight'
							noOfLines={2}>
							{item.name}
						</Box>
						<Box fontSize='xs'>Location: {item.location.name}</Box>
						<Box display='flex' mt='2'>
							<Box
								as='span'
								color='gray.600'
								fontSize='xs'
								textTransform={"uppercase"}
								fontWeight={"bold"}
								noOfLines={1}>
								{item.type}
							</Box>
						</Box>
					</Box>
				</Box>
			))}
			<Box w={"100%"} display={"flex"} gap={2} alignItems='center' mt={4}>
				<Box w={"100%"} fontSize='sm' fontWeight={"bold"} textTransform='uppercase'>
					Results: {data?.characters?.info?.count}
				</Box>
				<Spacer />
				<Button
					colorScheme='teal'
					disabled={page <= 1}
					onClick={() => setPage((previous) => previous - 1)}>
					Prev
				</Button>
                {page}
				<Button
					colorScheme='teal'
					onClick={() => setPage((previous) => previous + 1)}>
					Next
				</Button>
			</Box>
		</Grid>
	)
}

export default CharactersPage
