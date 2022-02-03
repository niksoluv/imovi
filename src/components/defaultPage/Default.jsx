import { Button, Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const DefaultPage = () => {
	return (
		<div>
			<h3>default page</h3>

			<NavLink as={Col} to={{ pathname: '/login' }}>
				<Button as={Col} variant="secondary" className="mx-2">login</Button>
			</NavLink>
		</div>
	)
}

export default DefaultPage