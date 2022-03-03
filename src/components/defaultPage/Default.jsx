import { Button, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getDataAction } from './../../store/authReducer'


const DefaultPage = () => {

	const dispatch = useDispatch()

	const userData = useSelector((state) => {
		return state.userInfo.userData
	})

	const [movies, setMovies] = useState([])

	useEffect()

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
		<div>
			<h3>default page</h3>
		</div>
	)
}

export default DefaultPage