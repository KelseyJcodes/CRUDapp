import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PostForm} from '../post/PostForm';
import * as reactRedux from 'react-redux';



jest.mock('uuid', ()=> ({ v4: () => '00000000-0000-0000-0000-000000000000' }));
jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
	useDispatch: jest.fn()
}))

describe('Test Post component', () => {
	beforeEach(() => {
		useDispatchMock.mockImplementation(() => {
		})
		useSelectorMock.mockImplementation(selector => selector(mockStore))
	})
	afterEach(() => {
		useDispatchMock.mockClear()
		useSelectorMock.mockClear()
	})
	const useSelectorMock = reactRedux.useSelector
	const useDispatchMock = reactRedux.useDispatch
	const mockStore = {
		comments: [],
		loggedInUser: {id: '', username: ''},
		postList: [],

	}

test('should show an input field with text ""', () => {
	//const dispatch = jest.fn()
	render(<PostForm />);
	const input = screen.getByPlaceholderText("Say what?");
	expect(input.tagName).toBe('TEXTAREA');
})

	test('should show a button with text "Post" and uses ' +
		'uses users/NEW_POST dispatch', ()=>{
		const dispatch = useDispatchMock()
		const formData = {content:''}
		render (<PostForm _useDispatch={()=>useDispatchMock}/>);
		const button = screen.getByText("Post");
		userEvent.click(button)
		expect (button.tagName).toBe('BUTTON');
		expect(dispatch).toHaveBeenCalledWith({type: 'users/NEW_POST', formData})
	})
})