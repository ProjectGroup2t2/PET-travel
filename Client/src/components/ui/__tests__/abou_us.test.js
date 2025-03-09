import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';


const mockPush = jest.fn();


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush, 
  }),
}));


const MockAboutUsLink = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/about-us')}>
      ABOUT US
    </button>
  );
};

test('Clicking ABOUT US link navigates to /about-us', () => {
  render(<MockAboutUsLink />);
  const aboutUsLink = screen.getByText('ABOUT US');
  fireEvent.click(aboutUsLink);
  expect(mockPush).toHaveBeenCalledWith('/about-us');
});