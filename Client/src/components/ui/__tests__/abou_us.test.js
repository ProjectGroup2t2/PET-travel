import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush, 
  }),
}));

const MockProfileLink = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/profile')}>
      PROFILE
    </button>
  );
};

test('Clicking PROFILE link navigates to /profile', () => {
  render(<MockProfileLink />);

  const profileLink = screen.getByText('PROFILE');

  fireEvent.click(profileLink);

  expect(mockPush).toHaveBeenCalledWith('/profile');
});