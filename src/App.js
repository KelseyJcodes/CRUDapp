import './css/App.css';
import {useState} from "react";
import {Login} from "./components/login/Login";
import {Registration} from './components/registration/Registration';
import {useSelector} from "react-redux";
import {PostList} from "./components/post/PostList";
import {useDispatch} from "react-redux";
import {MessageBox} from "./components/thread/MessageBox"
import {Inbox} from "./components/thread/Inbox";


function App() {
	const [msgBox, setMsgBox] = useState(false)
	const [inbox, setInbox] = useState(false)
	const loggedInUser = useSelector(state => state.loggedInUser)
	const userList = useSelector(state=>state.userList)
	const selectedPost = useSelector(state=>state.selectedPost)
	const messages = useSelector(state=>state.messages)
	console.log(loggedInUser)
	console.log(userList)
	console.log(messages)
	const dispatch = useDispatch()

	// console.log("K_Sheesh".toLowerCase() === "k_sheesh".toLowerCase())
	if(!loggedInUser){
		return (
			<div className="App">
				<Login/>
				<Registration/>
			</div>

		)
	}

	return (
		<div className="App">
			<button style={{height:'100px'}} onClick={()=>{dispatch({type:'users/ON_LOGOUT'})}}>Logout</button>
			<button style={{height:'100px'}} onClick={()=>{
				setMsgBox(!msgBox)
				setInbox(false)
			}}>Message</button>
			<button style={{height:'100px'}} onClick={()=>{
				setMsgBox(false)
				setInbox(!inbox)
			}}>Inbox</button>
			{msgBox && <MessageBox/>}
			{inbox && <Inbox />}
			<PostList/>
		</div>

	);
}

export default App;
