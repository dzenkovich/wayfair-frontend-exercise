import { render, screen } from '@testing-library/react';
import App from './App';
import store from '../../../store'
import { Provider } from 'react-redux'
import React from 'react'

test('renders header', () => {
  render(<Provider store={store}><App /></Provider>);
  const headerElement = screen.getByRole('header');
  expect(headerElement).toBeInTheDocument();
});
