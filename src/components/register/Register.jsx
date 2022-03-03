import { useState } from "react"
import { NavLink } from "react-router-dom"
import { getToken, register, getUserData } from "../../storeAsyncActions/account"
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { getDataAction } from './../../store/authReducer';

const Register = () => {

	const dispatch = useDispatch();

	const [userData, setUserData] = useState({})
	const [errors, setErrors] = useState({})

	const userInfo = useSelector((state) => {
		return state.userInfo.userData
	})

	const changeHandler = (e) => {
		userData[e.target.id] = e.target.value
		setUserData(userData)
		handleErrors(e.target.id)
	}

	const handleErrors = (field) => {
		let re = new RegExp('')
		let found = {}

		switch (field) {
			case 'password':
				// password
				var passwordRegex = /^[a-zA-Z0-9_]{8,15}$/
				re = new RegExp(passwordRegex);
				found = userData.password.match(re)
				if (found === null) {
					errors['password'] = 'Password can only contain letters, numbers, and underscores, and must be between 8 and 15 characters long'
					setErrors({ ...errors })
				}
				else {
					errors['password'] = ''
					setErrors({ ...errors })
				}
				break
			case 'submitPassword':
				// submit password
				if (userData.password != userData.submitPassword) {
					errors['submitPassword'] = 'Passwords doesnt match'
					setErrors({ ...errors })
				}
				else {
					errors['submitPassword'] = ''
					setErrors({ ...errors })
				}
				break
			case 'username':
				// username
				var usernameRegex = /^[a-zA-Z0-9_]{4,15}$/
				re = new RegExp(usernameRegex);
				found = userData.username?.match(re)
				if (found === null) {
					errors['username'] = 'Username can only contain letters, numbers, and underscores, and must be between 4 and 15 characters long'
					setErrors({ ...errors })
				}
				else {
					errors['username'] = ''
					setErrors({ ...errors })
				}
				break
			case 'email':
				// email
				var emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				re = new RegExp(emailRegex);
				found = userData.email?.match(re)
				if (found === null) {
					errors['email'] = 'Wrong email'
					setErrors({ ...errors })
				}
				else {
					errors['email'] = ''
					setErrors({ ...errors })
				}
				break
			default:
				break
		}

	}

	const submitForm = (e) => {
		if (errors.username === '' && errors.email === '' && errors.password === '' && errors.submitPassword === '') {
			register(userData).then(res => {
				getToken(res).then(res => {
					getUserData(res.access_token).then(res => {
						const payload = {
							userData: res
						}
						dispatch(getDataAction(payload))
					})
				})
			})
		}
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
							placeholder="Username"
							onChange={changeHandler}
						/>
						<small id="emailHelp" className="text-danger form-text">
							{errors.username}
						</small>
					</div>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="text"
							className="form-control"
							id="email"
							name="EmailInput"
							aria-describedby="emailHelp"
							placeholder="Email"
							onChange={changeHandler}
						/>
						<small id="emailHelp" className="text-danger form-text">
							{errors.email}
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
							{errors.password}
						</small>
					</div>
					<div className="form-group">
						<label>Submit password</label>
						<input
							type="password"
							className="form-control"
							id="submitPassword"
							placeholder="Submit password"
							onChange={changeHandler}
						/>
						<small id="passworderror" className="text-danger form-text">
							{errors.submitPassword}
						</small>
					</div>
					<NavLink to={{ pathname: '/login' }}>Already have an account?</NavLink>
					<br />
					<button type="submit" className="btn btn-primary">
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register