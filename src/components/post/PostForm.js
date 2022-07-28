import {Button, Card, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import {v4 as UUID} from "uuid";
import {useDispatch, useSelector} from "react-redux";

function getPrettyDate() { //creates a date string in the format 'MM/DD/YYYY'
	let newDate = new Date()
	let month = newDate.getMonth() + 1
	let day = newDate.getDate()
	let year = newDate.getFullYear()
	return `${month}/${day}/${year}`
}

export function PostForm() {
	const dispatch = useDispatch()
	const loggedInUser = useSelector((state) => state.loggedInUser)
	const [formData, setFormData] = useState('')
	const selectedPost = useSelector(state => state.selectedPost)


	useEffect(() => {
		if (selectedPost) {
			setFormData(selectedPost.content)
		}
	}, [selectedPost])
	//needed useEffect because needed the form to update when the value of the selected
	//post is changed

	function submitForm(event) {
		event.preventDefault()
		if (selectedPost) {
			let post = {
				...selectedPost,
				content: formData
			}
			dispatch({type: 'post/ON_EDIT', post})
		} else {
			let newPost = {
				id: UUID(),
				username: loggedInUser.username,
				content: formData,
				date: getPrettyDate()
			}
			dispatch({type: 'users/NEW_POST', newPost})
		}
		setFormData('')
	}

	function handleChange(event) {
		setFormData(event.target.value)
	}

	return <Card className={'w-25 text-center'}>
		<h2>Create Post</h2>

		<Form onSubmit={(event) => submitForm(event)} className={'p-4'}>
			<Form.Control as='textarea' rows={3} value={formData} placeholder={'Say what?'}
						  onChange={(event) => handleChange(event)}></Form.Control>

			<Button type="submit">
				Post
			</Button>

		</Form>

	</Card>

}