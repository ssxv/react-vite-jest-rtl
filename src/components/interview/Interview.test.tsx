import { fireEvent, render, screen } from '@testing-library/react';
import Interview from './Interview';
import '@testing-library/jest-dom';

describe("Interview component", () => {
    test('should render Interview', () => {
        render(<Interview />);

        expect(
            screen.getByText('React Testing Library Interview')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Describe your experience with React Testing Library:')
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'What other tools or libraries do you use for testing React applications?'
            )
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('calls handleSubmit on form submit', () => {
        const { container } = render(<Interview />);

        fireEvent.change(screen.getByLabelText(/Describe your experience with React Testing Library:/i), {
            target: { value: 'None' },
        });
        fireEvent.change(screen.getByLabelText(/What other tools or libraries do you use for testing React applications?/i), {
            target: { value: 'Jest and Enzyme.' },
        });

        const form = container.querySelector('form');
        expect(form).not.toBeNull();
        const formElement = form!;

        // Spy on the form submission
        const handleSubmit = jest.fn();
        formElement.onsubmit = handleSubmit;

        fireEvent.submit(formElement);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});
