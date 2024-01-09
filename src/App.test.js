import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('adds a todo list', () => {
  render(<App />);
  
  const inputListElement = screen.getByPlaceholderText('New list name');
  const addListButtonElement = screen.getByText('Add Todo List');
  
  fireEvent.change(inputListElement, { target: { value: 'Groceries' } });
  fireEvent.click(addListButtonElement);
  
  const listElement = screen.getByText('Groceries');
  expect(listElement).toBeInTheDocument();
});

test('deletes a todo list', () => {
  render(<App />);
  
  const addListButtonElement = screen.getByText('Add Todo List');
  fireEvent.click(addListButtonElement);
  
  const deleteListButtonElement = screen.getAllByText('Delete')[0];
  fireEvent.click(deleteListButtonElement);
  
  expect(screen.queryByText('Default')).toBeNull();
});

test('edits the name of a todo list', () => {
  render(<App />);
  
  const editListButtonElement = screen.getAllByText('Edit')[0];
  fireEvent.click(editListButtonElement);
  
  const inputEditElement = screen.getByDisplayValue('Default');
  const saveButtonElement = screen.getByText('Save');
  
  fireEvent.change(inputEditElement, { target: { value: 'Chores' } });
  fireEvent.click(saveButtonElement);
  
  expect(screen.getByText('Chores')).toBeInTheDocument();
});

// Existing tests for todo items
test('adds a todo item', () => {
  render(<App />);
  
  const inputElement = screen.getByRole('textbox');
  const addButtonElement = screen.getByText('Add Todo');
  
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.click(addButtonElement);
  
  const todoElement = screen.getByText('Test Todo');
  expect(todoElement).toBeInTheDocument();
});

test('deletes a todo item', () => {
  render(<App />);
  
  const inputElement = screen.getByRole('textbox');
  const addButtonElement = screen.getByText('Add Todo');
  
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.click(addButtonElement);
  
  const deleteButtonElement = screen.getByText('Delete');
  fireEvent.click(deleteButtonElement);
  
  expect(screen.queryByText('Test Todo')).toBeNull();
});

test('edits a todo item', () => {
  render(<App />);
  
  const inputElement = screen.getByRole('textbox');
  const addButtonElement = screen.getByText('Add Todo');
  
  fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
  fireEvent.click(addButtonElement);
  
  const editButtonElement = screen.getByText('Edit');
  fireEvent.click(editButtonElement);
  
  const updateButtonElement = screen.getByText('Update Todo');
  fireEvent.change(inputElement, { target: { value: 'Updated Todo' } });
  fireEvent.click(updateButtonElement);
  
  expect(screen.queryByText('Test Todo')).toBeNull();
  expect(screen.getByText('Updated Todo')).toBeInTheDocument();
});
