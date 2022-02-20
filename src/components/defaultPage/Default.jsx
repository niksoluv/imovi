import { Button, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getUserData, logout } from "../../storeAsyncActions/account"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getDataAction } from './../../store/authReducer'


const DefaultPage = () => {

	const dispatch = useDispatch()

	const userData = useSelector((state) => {
		return state.userInfo.userData
	})

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

			{localStorage.getItem('userToken') ?
				<>you logged in as {userData.username }</>
				:
				<></>}
			<NavLink as={Col} to={{ pathname: '/login' }}>
				<Button as={Col} variant="secondary" className="mx-2">login</Button>
			</NavLink>
			<Button as={Col} onClick={()=>logout(dispatch)} variant="secondary" className="mx-2">logout</Button>
		</div>
	)
}

export default DefaultPage