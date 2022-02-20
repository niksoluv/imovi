import { useState } from "react"
import { NavLink } from "react-router-dom"
import { getToken, register, getUserData } from "../../storeAsyncActions/account"
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../store/authReducer";
import { getDataAction } from './../../store/authReducer';

const Register = () => {

	const dispatch = useDispatch();

	const [userData, setUserData] = useState({})

	const userInfo = useSelector((state) => {
		return state.userInfo.userData
	})

	const changeHandler = (e) => {
		userData[e.target.id] = e.target.value
		setUserData(userData)
	}

	const submitForm = (e) => {
		register(userData).then(res => {
			getToken(res).then(res => {
				getUserData(res.access_token).then(res=>{
				const payload = {
					userData: res
				}
				dispatch(getDataAction(payload))
				})
			})
		})
	}
	if (userInfo) {
		if (userInfo?.id) {
			return <Navigate to='/' />
		}
	}

	return (

		<div className="row d-flex justify-content-center mt-2">
			<div className="col-md-4">
				<form id="loginform" onSubmit={(e) => {
					e.preventDefault()
					submitForm()
				}}>
					<div className="form-group">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="EmailInput"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							onChange={changeHandler}
						/>
						<small id="emailHelp" className="text-danger form-text">

						</small>
					</div>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="EmailInput"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							onChange={changeHandler}
						/>
						<small id="emailHelp" className="text-danger form-text">
							{'sioadjfoajsdfj'}
						</small>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Password"
							onChange={changeHandler}
						/>
						<small id="passworderror" className="text-danger form-text">

						</small>
					</div>
					<div className="form-group">
						<label>Submit password</label>
						<input
							type="password"
							className="form-control"
							id="submitPassword"
							placeholder="Password"

						/>
						<small id="passworderror" className="text-danger form-text">

						</small>
					</div>
					<div className="form-group form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="exampleCheck1"
						/>
						<NavLink to={{ pathname: '/login' }}>Already have an account?</NavLink>
					</div>
					<button type="submit" className="btn btn-primary">
						Register
					</button>

				</form>
			</div>
		</div>
	)
}

export default Register