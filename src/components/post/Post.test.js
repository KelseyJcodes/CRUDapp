import {Post} from "./Post";
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux"

jest.mock('uuid', ()=> ({ v4: () => '00000000-0000-0000-0000-000000000000' }));
jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
	// useDispatch: jest.fn()
}))

describe('Test Post component', () => {
	beforeEach(() => {
		// useDispatchMock.mockImplementation(() => {
		// })
		useSelectorMock.mockImplementation(selector => selector(mockStore))
	})
	afterEach(() => {
		// useDispatchMock.mockClear()
		useSelectorMock.mockClear()
	})
	const useSelectorMock = reactRedux.useSelector
	// const useDispatchMock = reactRedux.useDispatch
	const mockStore = {
		comments: [],
		loggedInUser: {id: '', username: ''},
		postList: [],

	}

	test('should show a button with text "Delete" and uses post/ON_DELETE dispatch', () => {
		const mockPost = {id: '00000000-0000-0000-0000-000000000000', username: '', content: '', date: ''}
		render(<Post post={mockPost}/>)
		const button = screen.getByText('Delete')
		expect(button.tagName).toBe('BUTTON')
	})


	// test('should show a button with text "Edit" and uses' +
	// 	'post/ON_EDIT dispatch', () => {
	// 	//const dispatch = jest.fn()
	// 	const mockPost = {id: '00000000-0000-0000-0000-000000000000', username: '', content: '', date: ''}
	// 	render(<Post post={mockPost}/>);
	//
	// 	const button = screen.getByText('Edit');
	// 	expect(button.tagName).toBe('BUTTON');
	// 	//userEvent.click(button);
	// 	//expect(dispatch).toHaveBeenCalledWith({type: 'post/ON_SELECT', postId:mockPost.id})
	//
	// })

	test('should show a button with text "Comment" and uses' +
		'post/ON_COMMENT dispatch', ()=>{
		const dispatch = jest.fn()
		const mockPost = {id: '00000000-0000-0000-0000-000000000000', username: '', content: '', date: ''}
		const newComment= {content:"", id: "00000000-0000-0000-0000-000000000000",postId: "00000000-0000-0000-0000-000000000000", username: "",}
		render(<Post post={mockPost} _useDispatch={dispatch}/>);

		const button = screen.getByText('Comment');
		userEvent.click(button);
		expect(dispatch).toHaveBeenCalledWith({type: 'post/ON_COMMENT', newComment})

	})

	test('should show a button with text "Delete" and uses' +
		'post/ON_DELETE dispatch', ()=>{
		const mockPost = {id:'00000000-0000-0000-0000-000000000000', username:'', content:'', date:''}
		render(<Post post = {mockPost}/>);

		const button = screen.getByText('Delete');
		userEvent.click(button);
		expect(useDispatchMock).toHaveBeenCalledWith({type: 'post/ON_DELETE', postId:mockPost.id})

	})


})



