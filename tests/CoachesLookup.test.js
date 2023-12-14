import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
import axios from 'axios';
import CoachesLookup from './CoachesLookup';

jest.mock('axios');

const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('CoachesLookup Component', () => {
  beforeEach(() => {
    window.localStorage.setItem('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        {
          approved: true,
          coach_id: 1,
          first_name: 'FirstName1',
          last_name: 'LastName1',
          location: 'Location1',
          member_id: 1,
          price: 1,
          qualifications: 'Qualifications1',
          schedule_general: 'ScheduleGeneral1',
          specialization: 'Specialization1'
        },
        {
          approved: true,
          coach_id: 2,
          first_name: 'FirstName2',
          last_name: 'LastName2',
          location: 'Location2',
          member_id: 2,
          price: 2,
          qualifications: 'Qualifications2',
          schedule_general: 'ScheduleGeneral2',
          specialization: 'Specialization2'
        },
        {
          approved: true,
          coach_id: 3,
          first_name: 'FirstName3',
          last_name: 'LastName3',
          location: 'Location3',
          member_id: 3,
          price: 3,
          qualifications: 'Qualifications3',
          schedule_general: 'ScheduleGeneral3',
          specialization: 'Specialization3'
        }
      ]
    });
  });

  it('renders coaches lookup page', async () => {
    render(<CoachesLookup />);
    expect(screen.getByText('Coaches Lookup')).toBeInTheDocument();
  });
  
  it('renders coaches list', async () => {
    render(<CoachesLookup />);
    await waitFor(() => {
      expect(screen.getByText('FirstName1 LastName1')).toBeInTheDocument();
      expect(screen.getByText('FirstName2 LastName2')).toBeInTheDocument();
      expect(screen.getByText('FirstName3 LastName3')).toBeInTheDocument();
    });
  });
  
  it('renders coaches list after location search', async () => {
    render(<CoachesLookup />);
    const searchInput = screen.getByPlaceholderText('Search by location, qualifications, cost');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'Location1' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.getByText('FirstName1 LastName1')).toBeInTheDocument();
      expect(screen.queryByText('FirstName2 LastName2')).not.toBeInTheDocument();
      expect(screen.queryByText('FirstName3 LastName3')).not.toBeInTheDocument();
    });
  });

  it('renders coaches list after qualification search', async () => {
    render(<CoachesLookup />);
    const searchInput = screen.getByPlaceholderText('Search by location, qualifications, cost');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'Qualifications2' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.queryByText('FirstName1 LastName1')).not.toBeInTheDocument();
      expect(screen.getByText('FirstName2 LastName2')).toBeInTheDocument();
      expect(screen.queryByText('FirstName3 LastName3')).not.toBeInTheDocument();
    });
  });

  it('renders coaches list after cost search', async () => {
    render(<CoachesLookup />);
    const searchInput = screen.getByPlaceholderText('Search by location, qualifications, cost');
    const searchButton = screen.getByText('Search');
    fireEvent.change(searchInput, { target: { value: '3' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.queryByText('FirstName1 LastName1')).not.toBeInTheDocument();
      expect(screen.queryByText('FirstName2 LastName2')).not.toBeInTheDocument();
      expect(screen.getByText('FirstName3 LastName3')).toBeInTheDocument();
    });
  });
});
