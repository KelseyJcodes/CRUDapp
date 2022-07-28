import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Button, Form} from "react-bootstrap";
import {v4 as UUID} from "uuid";


export function Registration(props){
	let empty = {
		id: UUID(),
		fullName:'',
		username:'',
		password:'',
		confirm:''
	}
	const {
		user = empty,
		_useDispatch=useDispatch,
		_useSelector=useSelector,
	} = props

	const [formData, setFormData]= useState(user)
	const dispatch = _useDispatch()
	const userList = _useSelector((state)=>state.userList)

	const [error, setError]= useState(false)
	const [error2, setError2]= useState(false)

	function submitForm(e){
		e.preventDefault()
		if (userList.filter((user)=> user.username.toLowerCase() === formData.username.toLowerCase())[0]){
			setError2(true)
			return
		}
		if ( formData.password !== formData.confirm ) {
			setError(true)
			return
		}
		setError(false)
		//set a variable for the new user and make it an empty object (let newUser = {})
		//inside the object we'll need an id, name, username, password
		//notice that 'id' is the only thing not being controlled by formData. We'll have to add it here. How do we do that?
		let newUser = {
			id: formData.id,
			name: formData.fullName,
			username: formData.username,
			password: formData.password
		}
		//dispatch goes here. Don't forget to import it and assign it to a variable
		// something like (x = useDispatch())
		//call your variable as a function and pass in an action object as an argument
		//something like x({type: "category/ACTION" })
		dispatch({type:'users/ON_REGISTRATION', newUser})
		setFormData(empty)
	}

	function handleChange(event){
		setFormData({
				...formData,
				[event.target.name]:event.target.value
			}
		)
	}

	return<Card className={'w-25 text-center'}>
		<h2>Sign Up</h2>

		<Form onSubmit={(event)=>submitForm(event)} className={'p-4'}>
			<Form.Group className={'mb-4'}>
				<Form.Label>Full Name</Form.Label>
				<Form.Control onChange={(event)=>handleChange(event)} value={formData.fullName} name={'fullName'} type={'text'} placeholder={'Full Name'}/>
			</Form.Group>

			<Form.Group className={'mb-4'}>
				<Form.Label>Username</Form.Label>
				<Form.Control onChange={(event)=>handleChange(event)} value={formData.username} name={'username'} type={'text'} placeholder={'Username'}/>
			</Form.Group>

			<Form.Group className={'mb-4'}>
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={(event)=>handleChange(event)} value={formData.password} name={'password'} type={'password'} placeholder={'Password'}/>
			</Form.Group>

			<Form.Group className={'mb-4'}>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control onChange={(event)=>handleChange(event)} value={formData.confirm} name={'confirm'} type={'password'} placeholder={'Confirm Password'}/>
			</Form.Group>

			<Button type="submit">
				Register
			</Button>
			{error && <p style={{'color':'red'}}>Passwords do not match.</p>}
			{error2 && <p style={{'color':'red'}}>Username already exists.</p>}

		</Form>

	</Card>

}