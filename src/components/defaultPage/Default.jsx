import { Container, Row, ButtonGroup, ToggleButton } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getMovies, getPopular, getTrending } from "../../storeAsyncActions/movies"
import MovieCard from "../movieCard/MovieCard"
import { ScrollMenu } from "react-horizontal-scrolling-menu"


const DefaultPage = (props) => {

	const [period, setPeriod] = useState('day')
	const [trendingType, setTrendingType] = useState('all')
	const [moviesType, setMoviesType] = useState('now_playing')
	const [popularType, setPopularType] = useState('popular tv')
	const [trending, setTrending] = useState([])
	const [movies, setMovies] = useState([])
	const [popular, setPopular] = useState([])

	const [trendingTypeRadioValue, setTrendingTypeRadioValue] = useState('1')
	const [trendingPeriodRadioValue, setTrendingPeriodRadioValue] = useState('1')
	const [movieRadioValue, setMovieRadioValue] = useState('1')
	const [popularRadioValue, setPopularRadioValue] = useState('1')

	const trendingPeriodRadios = [
		{ name: 'day', value: '1', displayName: 'day' },
		{ name: 'week', value: '2', displayName: 'week' },
	]

	const trendingTypeRadios = [
		{ name: 'all', value: '1', displayName: 'all' },
		{ name: 'movie', value: '2', displayName: 'movie' },
		{ name: 'tv', value: '3', displayName: 'tv' },
	]

	const movieRadios = [
		{ name: 'now_playing', value: '1', displayName: 'now playing' },
		{ name: 'top_rated', value: '2', displayName: 'top rated' },
		{ name: 'upcoming', value: '3', displayName: 'upcoming' },
	];

	const popularRadios = [
		{ name: 'popular tv', value: '1', displayName: 'on tv' },
		{ name: 'popular movie', value: '2', displayName: 'in theatres' },
	];

	const moviesData = useSelector((state) => {
		return state.movies.movies
	})

	useEffect(() => {
		switch (props.mode) {
			case 'default':
				getTrending(period, trendingType).then(res => {
					const arr = res.results.map((el) => {
						return (
							<MovieCard movie={el} key={`${el.id}_trending`}/>
						)
					})
					setTrending(arr)
				})
				break
			case 'search':
				const arr = moviesData?.results?.map((el) => {
					return (
						<MovieCard movie={el} key={`${el.id}_search`} />
					)
				})
				setTrending(arr)
				break
			default:
				break
		}
	}, [moviesData?.results, period, trendingType])

	useEffect(() => {
		getMovies(moviesType).then(res => {
			const arr = res.results.map((el) => {
				return (
					<MovieCard movie={el} key={`${el.id}_movies`} />
				)
			})
			setMovies(arr)
		})
	}, [moviesType])

	useEffect(() => {
		getPopular(popularType.split(' ')[1]).then(res => {
			const arr = res.results.map((el) => {
				el.media_type = popularType.split(' ')[1]
				return (
					<MovieCard movie={el} key={`${el.id}_popular`} />
				)
			})
			setPopular(arr)
		})
	}, [popularType])

	const handlePeriod = (period) => {
		setPeriod(period)
	}

	const handleType = (period) => {
		setTrendingType(period)
	}

	const handleMovies = (type) => {
		setMoviesType(type)
	}

	const handlePopular = (type) => {
		setPopularType(type)
	}

	return (
		<Container fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
			Trending
			<Row xs="auto">
				<ButtonGroup className="m-1">
					{trendingPeriodRadios.map((radio, idx) => (
						<ToggleButton
							size="sm"
							onClick={(e) => handlePeriod(radio.name)}
							key={radio.name}
							id={`radio-${radio.name}`}
							type="radio"
							variant={'outline-danger'}
							name={radio.name}
							value={radio.value}
							checked={trendingPeriodRadioValue === radio.value}
							onChange={(e) => setTrendingPeriodRadioValue(e.currentTarget.value)}
						>
							{radio.displayName}
						</ToggleButton>
					))}
				</ButtonGroup>
				<ButtonGroup className="m-1">
					{trendingTypeRadios.map((radio, idx) => (
						<ToggleButton
							size="sm"
							onClick={(e) => handleType(radio.name)}
							key={radio.name}
							id={`radio-${radio.name}`}
							type="radio"
							variant={'outline-danger'}
							name={radio.name}
							value={radio.value}
							checked={trendingTypeRadioValue === radio.value}
							onChange={(e) => setTrendingTypeRadioValue(e.currentTarget.value)}
						>
							{radio.displayName}
						</ToggleButton>
					))}
				</ButtonGroup>
				<ScrollMenu
					dragging={true}
					wheel={false}
					alignCenter={false}
					clickWhenDrag={false} >
					{trending}
				</ScrollMenu>
			</Row>

			Popular
			<Row xs="auto">
				<ButtonGroup className="m-1">
					{popularRadios.map((radio, idx) => (
						<ToggleButton
							size="sm"
							onClick={(e) => handlePopular(radio.name)}
							key={radio.name}
							id={`radio-${radio.name}`}
							type="radio"
							variant={'outline-danger'}
							name={radio.name}
							value={radio.value}
							checked={popularRadioValue === radio.value}
							onChange={(e) => setPopularRadioValue(e.currentTarget.value)}
						>
							{radio.displayName}
						</ToggleButton>
					))}
				</ButtonGroup>
				<ScrollMenu
					dragging={true}
					wheel={false}
					alignCenter={false}
					clickWhenDrag={false} >
					{popular}
				</ScrollMenu>
			</Row>

			Movies
			<Row xs="auto">
				<ButtonGroup className="m-1">
					{movieRadios.map((radio, idx) => (
						<ToggleButton
							size="sm"
							onClick={(e) => handleMovies(radio.name)}
							key={radio.name}
							id={`radio-${radio.name}`}
							type="radio"
							variant={'outline-danger'}
							name={radio.name}
							value={radio.value}
							checked={movieRadioValue === radio.value}
							onChange={(e) => setMovieRadioValue(e.currentTarget.value)}
						>
							{radio.displayName}
						</ToggleButton>
					))}
				</ButtonGroup>
				<ScrollMenu
					dragging={true}
					wheel={false}
					alignCenter={false}
					clickWhenDrag={false} >
					{movies}
				</ScrollMenu>
			</Row>
		</Container>
	)
}

export default DefaultPage