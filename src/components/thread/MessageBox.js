import {useSelector, useDispatch} from "react-redux";
import {Form} from "react-bootstrap";
import {useState} from "react";

export function MessageBox() {
	const dispatch= useDispatch()
	const users = useSelector(state => state.userList)
	const loggedIn = useSelector(state=>state.loggedInUser)
	const [formData, setFormData] = useState({
		message: '',
		to: 'Tigernip'
	})

	function sendMsg(e){
		e.preventDefault()
		let msg = {
			id: 0,
			sender: loggedIn.username,
			receiver: formData.to,
			content: formData.message
		}
		dispatch({type: "user/MESSAGE", msg})

	}
	function handleChange(e){
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	return <Form style={formStyle} onSubmit={(e) => sendMsg(e)}>
		<div>
			<label>To:</label>
			<select name={"to"} value={formData.to} onChange={(e)=> handleChange(e)}>
				{
					users.map(user => {
						if (user.id !== loggedIn.id){
							return <option>{user.username}</option>
						}
					})
				}
			</select>
		</div>

		<label>Message:</label>
		<br />
		<textarea name={"message"} style={{width:"100%"}} value={formData.message} onChange={(e)=> handleChange(e)}></textarea>
		<button>Send</button>
	</Form>
}

const formStyle = {
	width: "500px",
	backgroundColor: "lightgray",
	border: "1px solid gray",
	borderRadius: "5px",
	position: "absolute",
	top: "50vh",
	left: "50vw",
	transform: "translate(-50%, -50%)",
	zIndex: 2,
	padding: "2rem"
}