import { Button, Card, Container, Col, Row, ButtonGroup, ButtonToolbar, ToggleButton } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getDataAction } from './../../store/authReducer'
import { getMovies, getTrending } from "../../storeAsyncActions/movies"
import MovieCard from "../movieCard/MovieCard"
import { ScrollMenu } from "react-horizontal-scrolling-menu"


const DefaultPage = (props) => {

	const dispatch = useDispatch()

	const [period, setPeriod] = useState('day')
	const [trendingType, setTrendingType] = useState('all')
	const [moviesType, setMoviesType] = useState('now_playing')
	const [trending, setTrending] = useState([])
	const [movies, setMovies] = useState([])

	const [trendingTypeRadioValue, setTrendingTypeRadioValue] = useState('1')
	const [trendingPeriodRadioValue, setTrendingPeriodRadioValue] = useState('1')
	const [movieRadioValue, setMovieRadioValue] = useState('1')

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
		{ name: 'popular', value: '2', displayName: 'popular' },
		{ name: 'top_rated', value: '3', displayName: 'top rated' },
		{ name: 'upcoming', value: '4', displayName: 'upcoming' },
	];

	const Arrow = ({ text, className }) => {
		return <div className={className}>{text}</div>;
	};

	const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
	const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

	const userData = useSelector((state) => {
		return state.userInfo.userData
	})

	const moviesData = useSelector((state) => {
		return state.movies.movies
	})

	useEffect(() => {
		switch (props.mode) {
			case 'default':
				getTrending(period, trendingType).then(res => {
					console.log(res)
					const arr = res.results.map((el) => {
						return (
							<MovieCard movie={el} />
						)
					})
					setTrending(arr)
				})
				break
			case 'search':
				const arr = moviesData?.results?.map((el) => {
					return (
						<MovieCard movie={el} />
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
			console.log(res)
			const arr = res.results.map((el) => {
				return (
					<MovieCard movie={el} />
				)
			})
			setMovies(arr)
		})
	}, [moviesType])

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			getUserData(localStorage.getItem('userToken')).then(res => {
				const payload = {
					userData: res
				}
				dispatch(getDataAction(payload))
			})
		}
	}, [userData?.id])

	const handlePeriod = (period) => {
		setPeriod(period)
	}

	const handleType = (period) => {
		setTrendingType(period)
	}

	const handleMovies = (type) => {
		setMoviesType(type)
	}

	return (
		<Container fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
			Trending
			<Row xs="auto">

				{/* trending period toggle */}
				<ButtonGroup>
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
				{/* trending type toggle */}
				<ButtonGroup>
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
					arrowLeft={(ArrowLeft)}
					arrowRight={ArrowRight}
					dragging={true}
					wheel={false}
					alignCenter={false}
					clickWhenDrag={false} >
					{trending}
				</ScrollMenu>
			</Row>

			Movies
			<Row xs="auto">
				<ButtonGroup>
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
					arrowLeft={(ArrowLeft)}
					arrowRight={ArrowRight}
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