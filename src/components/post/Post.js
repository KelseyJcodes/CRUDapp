import {useState} from "react";
import {Card, Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import { CommentList } from "../comment/CommentList";
import {v4 as UUID} from 'uuid';



export function Post(props) {
	const {
		_useDispatch = useDispatch, _useSelector = useSelector
	} = props
	const dispatch = _useDispatch()
	const loggedInUser = _useSelector((state)=>state.loggedInUser)
	const comments = _useSelector(state=>state.comments.filter(comment=>comment.postId===props.post.id))
	const postId = props.post.id
	const [commentForm, setCommentForm] = useState(false)
	const [formData, setFormData]= useState('')
	let newComment ={
		id: UUID(),
		postId: postId,
		username:loggedInUser.username,
		content: formData,
	}


	function onDelete(){
		dispatch({type: 'post/ON_DELETE', postId})
	}

	function onEdit(){
		dispatch({type:'post/ON_SELECT', postId})
	}

	function onComment(){
		showCommentForm()
		dispatch({type:'post/ON_COMMENT', newComment})
	}

	function showCommentForm(){
		setCommentForm(!commentForm)
	}


	function handleChange(event){
		setFormData(event.target.value)

	}

	function submitForm(event){
		event.preventDefault()
		dispatch({type:'post/NEW_COMMENT', newComment})
		showCommentForm()

	}

	return (
		<Card style={{padding: "1rem"}}>
			<h4>{props.post.username}</h4>
			<span style={{color: "gray"}}>{props.post.date}</span>
			<p>{props.post.content}</p>
			<Button style={{width:'100px'}} onClick={()=>{onComment()}}>Comment</Button>
			{loggedInUser.username === props.post.username && <div>
				<Button onClick={()=>{onDelete()}}>Delete</Button>
				<Button onClick={()=>{onEdit()}}>Edit</Button>
			</div>}
			<div>
				{commentForm &&
					<Form onSubmit={(event)=>submitForm(event)}>
					<Form.Control as='textarea' rows={3} onChange={(event)=>handleChange(event)} value={formData}/>
					<Button type='submit'>
						Post
					</Button>
				</Form>}
			</div>
			{comments && <CommentList comments={comments}/>}
		</Card>
	)
}