import {Button, Card} from "react-bootstrap";
import {useSelector} from "react-redux";

export function Comment(props){
	const loggedInUser = useSelector((state)=>state.loggedInUser)
	return (
		<Card style={{padding: "1rem", backgroundColor: "#e7faf9"}}>
			<h6>{props.comment.username}</h6>
			<span style={{color: "gray"}}>{props.comment.date}</span>
			<p>{props.comment.content}</p>
			{loggedInUser.username === props.comment.username && <div>
				<Button>Delete</Button>
			</div>}
		</Card>
	)
}