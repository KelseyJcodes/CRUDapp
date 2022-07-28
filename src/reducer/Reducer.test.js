import reducer from '../reducer/reducer';

test('should initialize state as loggedInUser', () => {
	const state = reducer()
	expect(state).toStrictEqual({
		loggedInUser: null,
		userList: [
			{id: 1, username: 'K_Sheesh', password: 'ggg'},
			{id: 2, username: 'Tigernip', password: 'blah'},
			{id: 3, username: '2hot2trott', password: 'blah'},
		],
		postList: [
			{id: 1, username: 'K_Sheesh', content: 'This is a dummy post.', date: '06/09/22'},
		],
		comments: [
			{id: 11, postId: 1, username: 'K_Sheesh', content: "typo. meant to say dummy poot"},
			{id: 12, postId: 1, username: 'K_Sheesh', content: "Actually meant to say smarty poot"},
			{id: 13, postId: 1, username: 'K_Sheesh', content: "eggs and steak"},
		],
		selectedPost: null,
		selectedPostComment: null,
		messages: [
			{id: 1, sender: 'K_Sheesh', receiver: 'Tigernip', content: "i love you"},
			{id: 2, sender: 'Tigernip', receiver: 'K_Sheesh', content: "aww sugar booger!! i love you too"},
			{id: 3, sender: 'K_Sheesh', receiver: 'Tigernip', content: "what you doing anyway"},
			{id: 4, sender: 'Tigernip', receiver: 'K_Sheesh', content: "chile. struggling"}
		],

	})
})

test('should change loggedInUser from null to object', () => {
	const initialState = reducer()
	const state = reducer(initialState, {type: 'users/ON_LOGIN', formData: {username: "K_Sheesh", password: "ggg"}})
	expect(state).toStrictEqual({
		...initialState,
		loggedInUser: {id: 1, username: 'K_Sheesh', password: 'ggg'}
	})
})

test('should add new user to UserList', () => {
	const initialState = reducer()
	const newUser = {}
	const state = reducer(initialState, {type: 'users/ON_REGISTRATION', newUser})
	expect(state).toStrictEqual({
		...initialState,
		userList: [
			{id: 1, username: 'K_Sheesh', password: 'ggg'},
			{id: 2, username: 'Tigernip', password: 'blah'},
			{id: 3, username: '2hot2trott', password: 'blah'},
			{}
		],
		loggedInUser: {}
	})
})

test('should log user out and remove from loggedInUser', () => {
	const initialState = reducer()
	const state = reducer(initialState, {type: 'users/ON_LOGOUT'})
	expect(state).toStrictEqual({
		...initialState,
		loggedInUser: false
	})
})

test('should select post', () => {
	const initialState = reducer()
	const postId = 1
	const state = reducer(initialState, {type: 'post/ON_SELECT', postId})
	expect(state).toStrictEqual({
		...initialState,
		selectedPost: {id: 1, username: 'K_Sheesh', content: 'This is a dummy post.', date: '06/09/22'},

	})
})

test('should return selected post to text area box', () => {
	const initialState = reducer()
	const post = {id: 1, username: 'K_Sheesh', content: 'This is a dummy post.', date: '06/09/22'}
	const state = reducer(initialState, {type: 'post/ON_EDIT', post})
	expect(state).toStrictEqual({
		...initialState,
		selectedPost: null,
		 postList: [
			 post
		 ]

	})

})

test('should select post to add comment',()=>{
	const initialState = reducer()
	const postId = 1
	const state = reducer(initialState, {type:'post/ON_COMMENT', postId})
	expect(state).toStrictEqual({
		...initialState,
		selectedPostComment: {id: 1, username: 'K_Sheesh', content: 'This is a dummy post.', date: '06/09/22'}
	})
})

test('should add new message object to array of messages', ()=>{
	const initialState = reducer()
	const msg = {}
	const state = reducer(initialState, {type:'user/MESSAGE', msg})
	expect(state).toStrictEqual({
		...initialState,
		messages: [
			{id: 1, sender: 'K_Sheesh', receiver: 'Tigernip', content: "i love you"},
			{id: 2, sender: 'Tigernip', receiver: 'K_Sheesh', content: "aww sugar booger!! i love you too"},
			{id: 3, sender: 'K_Sheesh', receiver: 'Tigernip', content: "what you doing anyway"},
			{id: 4, sender: 'Tigernip', receiver: 'K_Sheesh', content: "chile. struggling"},
			{}
		]
	})

})

test('should add new comment to commentList', ()=>{
	const initialState = reducer()
	const newComment = {id: 13, postId: 1, username: 'K_Sheesh', content: "eggs and steak"}
	const state= reducer(initialState, {type:'post/NEW_COMMENT', newComment})
	expect(state).toStrictEqual({
		...initialState,
		comments: [
			{id: 11, postId: 1, username: 'K_Sheesh', content: "typo. meant to say dummy poot"},
			{id: 12, postId: 1, username: 'K_Sheesh', content: "Actually meant to say smarty poot"},
			{id: 13, postId: 1, username: 'K_Sheesh', content: "eggs and steak"},
			newComment
		]
	})
})