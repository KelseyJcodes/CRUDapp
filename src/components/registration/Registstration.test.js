import {Registration} from "./Registration";
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

	test('should show an input field with text "Full Name"', () => {
		//const dispatch = jest.fn()
		render(<Registration _useDispatch={useDispatchMock()}/>);
		const input = screen.getByPlaceholderText("Full Name");
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAttribute('type', 'text')
	})

	test('should show an input field with text "Username"', () => {
		//const dispatch = jest.fn()
		render(<Registration _useDispatch={useDispatchMock()}/>);
		const input = screen.getByPlaceholderText("Username");
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAttribute('type', 'text')
	})

	test('should show an input field with text "Confirm Password"', () => {
		const dispatch = jest.fn()
		render(<Registration _useDispatch={() => dispatch}/>);
		const input = screen.getByPlaceholderText("Confirm Password");
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAttribute('type', 'password')
	})

	test('should show an input field with text "password"', () => {
		const dispatch = jest.fn()
		render(<Registration _useDispatch={() => dispatch}/>);
		const input = screen.getByPlaceholderText("Password");
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAttribute('type', 'password')
	})

	test('should show a button with text "Register" and uses ' +
		'uses ON_REGISTRATION dispatch', () => {
		const dispatch = jest.fn()
		const newUser = {id: '00000000-0000-0000-0000-000000000000', name: '', password: '', username: ''}
		const userList = (state) => state({userList: []})
		render(<Registration _useDispatch={() => dispatch} _useSelector={userList}/>);
		const button = screen.getByText('Register');
		expect(button.tagName).toBe('BUTTON');
		userEvent.click(button);
		expect(dispatch).toHaveBeenCalledWith({type: 'users/ON_REGISTRATION', newUser})
	})
})