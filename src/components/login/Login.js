import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {useDispatch} from "react-redux";


export function Login({_useDispatch = useDispatch}) {
	const dispatch = _useDispatch()
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})


	function submitForm(event) {
		event.preventDefault()
		dispatch({type: 'users/ON_LOGIN', formData})
	}

	function handleChange(event) {
		setFormData({
			...formData,
			[event.target.placeholder]: event.target.value

		})
	}

	// console.log(user)
	return <Card className={'w-25 text-center'}>
		<h2>Sign In</h2>
		<Form onSubmit={(event) => submitForm(event)} className={'p-3'}>
			<Form.Group className={'mb-3'}>
				<Form.Label>Username</Form.Label>
				<Form.Control onChange={(event) => handleChange(event)} value={formData.username} type={'text'}
							  placeholder={"username"}/>
			</Form.Group>

			<Form.Group className={'mb-3'}>
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={(event) => handleChange(event)} value={formData.password} type={'password'}
							  placeholder={"password"}/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Login
			</Button>
		</Form>
	</Card>
}