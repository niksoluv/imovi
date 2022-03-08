import { Button, Card, Container, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getDataAction } from './../../store/authReducer'
import { getTrending } from "../../storeAsyncActions/movies"
import MovieCard from "../movieCard/MovieCard"


const DefaultPage = (props) => {

	const dispatch = useDispatch()

	const userData = useSelector((state) => {
		return state.userInfo.userData
	})

	const moviesData = useSelector((state) => {
		return state.movies.movies
	})

	const [movies, setMovies] = useState([])

	useEffect(() => {
		switch (props.mode) {
			case 'default':
				getTrending().then(res => {
					console.log(res)
					const arr = res.results.map((el) => {
						return (
							<MovieCard movie={el} />
						)
					})
					setMovies(arr)
				})
				break
			case 'search':
				const arr = moviesData?.results?.map((el) => {
					return (
						<MovieCard movie={el} />
					)
				})
				setMovies(arr)
				break
			default:
				break
		}
	}, [moviesData?.results])

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

	return (
		<Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
			<Row className='d-flex justify-content-center'>
				{movies}
			</Row>
		</Container>
	)
}

export default DefaultPage