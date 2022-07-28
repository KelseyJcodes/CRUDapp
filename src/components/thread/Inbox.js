import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";

export function Inbox(){
	const messages = useSelector(state => state.messages)
	const loggedIn = useSelector(state=>state.loggedInUser)

	return <Card style={inboxStyle}>
		{
			messages.map(message => {
				if (message.receiver === loggedIn.username) {
					return <Card>
						<h5>From {message.sender}</h5>
						<p>{message.content}</p>
					</Card>
				}
			})
		}
	</Card>
}

const inboxStyle = {
	width: "500px",
	backgroundColor: "lightgray",
	border: "1px solid gray",
	borderRadius: "5px",
	position: "absolute",
	top: "50vh",
	left: "50vw",
	transform: "translate(-50%, -50%)",
	zIndex: 1,
	padding: "2rem"
}