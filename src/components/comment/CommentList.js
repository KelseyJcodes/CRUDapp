import {Comment} from "./Comment";


export function CommentList(props){

	return <>
		{ props.comments.map((comment) => {
			return <Comment comment={comment} />
		}) }
	</>
}