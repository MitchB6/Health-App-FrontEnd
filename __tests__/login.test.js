import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '../src/pages/login.js';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMjM1NTk4MSwianRpIjoiMWFhMTA5NGUtNTdlMy00YTczLTk1MDItODYwZmZmNGRjYWMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzAyMzU1OTgxLCJleHAiOjE3MDIzNTk1ODEsInJvbGVfaWQiOjJ9.lPp3jrs8Qu35ScQR-nRVnmaNHO7viUjwtBCRYoAal5M'

describe('Login Component', () => {
  it('renders the login page', async () => {
    await act(async () => {
      render(
        <Router>
          <Login />
        </Router>
      );
    });
  });
  it('allows user input', async () => {
    await act(async () => {
      render(
        <Router>
          <Login />
        </Router>
      );
    });
    const username = screen.getByLabelText('E-mail:');
    fireEvent.change(username, { target: { value: 'testUsername' } });
    expect(username.value).toBe('testUsername');
    const password = screen.getByLabelText('Password:');
    fireEvent.change(password, { target: { value: 'testPassword' } });
    expect(password.value).toBe('testPassword');
  });
  it('allows user to submit', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          'access token': mockAccessToken,
          'refresh token': mockAccessToken
        }
      })
    );
    await act(async () => {
      render(
        <Router>
          <Login />
        </Router>
      );
    });
    const username = screen.getByLabelText('E-mail:');
    fireEvent.change(username, { target: { value: 'testUsername' } });
    const password = screen.getByLabelText('Password:');
    fireEvent.change(password, { target: { value: 'testPassword' } });
    const submit = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submit);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

});