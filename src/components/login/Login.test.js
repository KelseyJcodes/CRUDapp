import {render, screen} from "@testing-library/react";
import {Login} from './Login';
import userEvent from "@testing-library/user-event";

test('should show an input field with text "username"', ()=>{
	const dispatch = jest.fn()
	render (<Login _useDispatch={()=>dispatch}/>);
	const input =screen.getByPlaceholderText("username");
	expect(input.tagName).toBe('INPUT');
	expect(input).toHaveAttribute('type', 'text')
})

test('should show an input field with text "password"', ()=>{
	const dispatch = jest.fn()
	render (<Login _useDispatch={()=>dispatch}/>);
	const input =screen.getByPlaceholderText("password");
	expect(input.tagName).toBe('INPUT');
	expect(input).toHaveAttribute('type', 'password')
})

test('should show a button with text "Login" and uses ' +
	'uses ON_LOGIN dispatch', ()=>{
	const dispatch = jest.fn()
	const formData = {username:"", password:""}
	render (<Login _useDispatch={()=>dispatch}/>);
	const button = screen.getByText("Login");
	expect (button.tagName).toBe('BUTTON');
	userEvent.click(button);
	expect(dispatch).toHaveBeenCalledWith({type: 'users/ON_LOGIN', formData})
})

