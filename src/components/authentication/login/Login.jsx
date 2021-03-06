import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDataAction } from "../../../store/authReducer";
import { getToken, getUserData, login } from "../../../storeAsyncActions/account";
import { Navigate } from 'react-router';
import { toast } from "react-toastify";

const Login = () => {

	const dispatch = useDispatch();

	const [userData, setUserData] = useState({})

	const userInfo = useSelector((state) => {
		return state.userInfo.userData
	})

	const changeHandler = (e) => {
		userData[e.target.id] = e.target.value
		setUserData(userData)
	}

	const notify = (message) => toast.error(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	const submitForm = (e) => {
		getToken(userData).then(res => {
			if (res?.response?.status === 404) {
				notify("Invalid username or password.")
				return
			}
			getUserData(res.access_token).then(res => {
				const payload = {
					userData: res
				}
				dispatch(getDataAction(payload))
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
							{''}
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
					<NavLink to={{ pathname: '/register' }}>Don't have an account?</NavLink>
					<br />
					<button type="submit" className="btn btn-primary">
						Login
					</button>

				</form>
			</div>
		</div>
	)
}

export default Login