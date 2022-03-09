import { Button, Card, Container, Col, Row, ButtonGroup, ButtonToolbar } from "react-bootstrap"
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
	const [moviesType, setMoviesType] = useState('latest')
	const [trending, setTrending] = useState([])
	const [movies, setMovies] = useState([])

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
				<ButtonGroup bsSize="xsmall" onClick={(e) => handlePeriod(e.target.value)} xs={1}>
					<Button value={'day'} variant="secondary">day</Button>
					<Button value={'week'} variant="secondary">week</Button>
				</ButtonGroup>
				<ButtonGroup bsSize="xsmall" onClick={(e) => handleType(e.target.value)} xs={1}>
					<Button value={'all'} variant="secondary">all</Button>
					<Button value={'movie'} variant="secondary">movie</Button>
					<Button value={'tv'} variant="secondary">tv</Button>
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
				<ButtonToolbar >
					<ButtonGroup type="radio" bsSize="small" onClick={(e) => handleMovies(e.target.value)} xs={1}>
						<Button value={'now_playing'} >now playing</Button>
						<Button value={'popular'} >popular</Button>
						<Button value={'top_rated'} >top rated</Button>
						<Button value={'upcoming'} >upcoming</Button>
					</ButtonGroup>
				</ButtonToolbar>
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