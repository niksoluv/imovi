import { NavLink } from "react-router-dom"

const Register = () => {
	return (
		<div className="row d-flex justify-content-center mt-2">
			<div className="col-md-4">
				<form id="loginform" onSubmit={() => { }}>
					<div className="form-group">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
							id="EmailInput"
							name="EmailInput"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						<small id="emailHelp" className="text-danger form-text">

						</small>
					</div>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							id="EmailInput"
							name="EmailInput"
							aria-describedby="emailHelp"
							placeholder="Enter email"

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
							id="exampleInputPassword1"
							placeholder="Password"

						/>
						<small id="passworderror" className="text-danger form-text">

						</small>
					</div>
					<div className="form-group">
						<label>Submit password</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
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