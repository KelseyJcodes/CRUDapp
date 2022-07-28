import { useSelector } from "react-redux";

function ThreadList(){

	const loggedIn = useSelector(state=>state.loggedInUser)
	const threads = useSelector(state=>{
		state.threads.filter((thread)=>thread.users.includes(loggedIn.id) )
	})


	return <>
		{
			threads.map((thread)=>{
				thread.users.map(user => {
					if (user !== loggedIn.id){
						return <button></button>
					}
				})
			})
		}
	</>
}