import { Button, Card, Container, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getDataAction } from './../../store/authReducer'
import { getTrending } from "../../storeAsyncActions/movies"


const DefaultPage = () => {

	const dispatch = useDispatch()

	const userData = useSelector((state) => {
		return state.userInfo.userData
	})

	const [movies, setMovies] = useState([])

	useEffect(() => {
		getTrending().then(res => {
			const arr = res.results.map((el) => {
				return (
					<Card className={'overflow-hidden bg-dark card border-secondary mb-1 text-white'} style={{ width: '15rem', height: '18rem' }} onClick={() => { console.log('click') }}>
						<Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${el.backdrop_path}`} />
						<Card.Body >
							<Card.Title>{el.original_title}</Card.Title>
							<Card.Text >
								<div >
									{el.overview}
								</div>
							</Card.Text>
						</Card.Body>
					</Card >)
			})
			debugger
			setMovies(arr)
		})
	}, [userData?.id])

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