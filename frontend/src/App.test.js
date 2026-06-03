import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {}));
});

describe('App component', () => {
  test('renders heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /ToDo Liste/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('allows user to add a new task', () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neue Aufgabe/i);
    const addButtonElement = screen.getByRole('button', { name: /Hinzuf/i });
    const taskName = 'Buy groceries';

    fireEvent.change(inputElement, { target: { value: taskName } });
    fireEvent.click(addButtonElement);

    expect(screen.getByText(taskName)).toBeInTheDocument();
  });

  test('updates input value when user types', () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neue Aufgabe/i);

    fireEvent.change(inputElement, { target: { value: 'Clean room' } });

    expect(inputElement).toHaveValue('Clean room');
  });

  test('renders existing tasks', () => {
    render(<App todos={[{ taskdescription: 'Existing Task' }]} />);

    expect(screen.getByText('Existing Task')).toBeInTheDocument();
  });

  test('sends delete request when done button is clicked', () => {
    render(<App todos={[{ taskdescription: 'Existing Task' }]} />);
    const doneButton = screen.getByRole('button', { name: /Done/i });

    fireEvent.click(doneButton);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskdescription: 'Existing Task' })
    });
  });
});
