const initialState = {
	loggedInUser: null,
	userList: [
		{id: 1, username: 'K_Sheesh', password: 'ggg'},
		{id: 2, username: 'Tigernip', password: 'blah'},
		{id: 3, username: '2hot2trott', password: 'blah'},
	],
	postList: [
		{id: 1, username: 'K_Sheesh', content: 'This is a dummy post.', date: '06/09/22' },
	],
	comments:[
		{id:11, postId:1, username: 'K_Sheesh', content: "typo. meant to say dummy poot"},
		{id:12, postId:1, username: 'K_Sheesh', content: "Actually meant to say smarty poot"},
		{id:13, postId:1, username: 'K_Sheesh', content: "eggs and steak"},
	],
	selectedPost: null,
	selectedPostComment: null,
	messages: [
		{id:1, sender:'K_Sheesh', receiver:'Tigernip', content: "i love you"},
		{id:2, sender:'Tigernip', receiver:'K_Sheesh', content: "aww sugar booger!! i love you too"},
		{id:3, sender:'K_Sheesh', receiver:'Tigernip', content: "what you doing anyway"},
		{id:4, sender:'Tigernip', receiver:'K_Sheesh', content: "chile. struggling"}
	],

}

function reducer(state= initialState, action){
	switch (action?.type){
		case 'users/ON_LOGIN':
			return {
				...state,
				loggedInUser: state.userList.filter((user) => user.username === action.formData.username && user.password === action.formData.password)[0]
			}
		case 'users/ON_REGISTRATION':
			return {
				...state,
				userList: [
					...state.userList,
					action.newUser
				],
				loggedInUser: {
					...action.newUser
				}
			}
		case 'users/ON_LOGOUT':
			return {
				...state,
				loggedInUser: false

			}
		case 'users/NEW_POST':
			return {
				...state,
				postList: [
					...state.postList,
					action.newPost
				]
			}
		case 'post/ON_DELETE':
			return {
				...state,
				postList: state.postList.filter((post) => post.id !== action.postId)
			}
		case 'post/ON_SELECT':
			return {
				...state,
				selectedPost: state.postList.filter((post)=>post.id === action.postId)[0]
			}
		case 'post/ON_EDIT':
			return{
				...state,
				selectedPost: null,
				postList: state.postList.map((post)=>{
					if(post.id === action.post.id){
						return action.post

					}
					return post
				})
			}
		case 'post/ON_COMMENT':
			return{
				...state,
				selectedPostComment: state.postList.filter((post)=>post.id === action.postId)[0]
			}
		case 'user/MESSAGE':
			return {
				...state,
				messages: [
					...state.messages,
					action.msg
				]
			}
		case 'post/NEW_COMMENT':
			return {
				...state,
				comments: [
					...state.comments,
						action.newComment
				]
			}
		default:
			return state
	}

}


export default reducer