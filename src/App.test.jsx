import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('TodoList App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders header and input form elements', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /hello everyone!/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/what's on your mind\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('adds a new todo item and clears input after submission', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what's on your mind\?/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'Learn Jest Testing');
    await user.click(addButton);

    expect(screen.getByText('Learn Jest Testing')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('does not add a todo when input is empty or whitespace', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what's on your mind\?/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, '   ');
    await user.click(addButton);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  test('loads existing todos from localStorage on mount', () => {
    const initialTodos = ['Task 1', 'Task 2'];
    localStorage.setItem('todos', JSON.stringify(initialTodos));

    render(<App />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('deletes a todo when the delete icon is clicked', async () => {
    const initialTodos = ['Task to delete'];
    localStorage.setItem('todos', JSON.stringify(initialTodos));

    const { container } = render(<App />);

    expect(screen.getByText('Task to delete')).toBeInTheDocument();

    const deleteIcon = container.querySelector('svg');
    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });

  test('updates localStorage when a new todo is added', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what's on your mind\?/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'Persisted Task');
    await user.click(addButton);

    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    expect(storedTodos).toContain('Persisted Task');
  });
});
