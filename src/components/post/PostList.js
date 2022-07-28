import {useSelector} from "react-redux";
import {Post} from "./Post";
import {Container} from "react-bootstrap";
import {PostForm} from "./PostForm";


export function PostList() {
	const postList = useSelector(state => state.postList)
	console.log(postList)
	return <Container fluid={'md'}>
		<PostForm/>
		{
			postList.map((post) => {
				return <Post post={post} key={post.id}/>
			})}
	</Container>
}