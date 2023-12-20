import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Admin from '../src/pages/admin.js';;
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Admin Component', () => {
  const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMzA0MzE4NywianRpIjoiYTZjZWIxZmMtMDIyNi00N2NhLTg1MzgtNDA2YmIyMjBiYjRlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzAzMDQzMTg3LCJleHAiOjE3MDMwNDY3ODcsInJvbGVfaWQiOjJ9.mOquznnaWYmrwYdRrJFk868LftF3fvQmfvyA82QnnWs';
  beforeEach(() => {
    window.localStorage.setItem('accessToken', mockAccessToken);
    window.localStorage.setItem('refreshToken', mockAccessToken);
    axios.put.mockResolvedValue({ status: 200 });
    axios.post.mockResolvedValue({ status: 200 });
    axios.get.mockResolvedValue((url) => {
      if(url.includes('admin')) {
        return Promise.resolve({
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
        })
      } else if(url.includes('exercises')) {
        return Promise.resolve({
          status: 200,
          data: [
            {
              descripton: 'Description1',
              equipment: 'Equipment1',
              exercise_id: 1,
              is_active: true,
              muscle_group: 'MuscleGroup1',
              name: 'Name1',
            }, 
            {
              descripton: 'Description2',
              equipment: 'Equipment2',
              exercise_id: 2,
              is_active: true,
              muscle_group: 'MuscleGroup2',
              name: 'Name2',
            }, 
            {
              descripton: 'Description3',
              equipment: 'Equipment3',
              exercise_id: 3,
              is_active: true,
              muscle_group: 'MuscleGroup3',
              name: 'Name3',
            }
          ]
        })
      }
    });
  });

  it('should render the admin page', async () => {
    render(
      <Router>
        <Admin />
      </Router>
    );
  });

  it('should render and click the show coaches button to display coaches', async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
    await waitFor(() => expect(screen.getByText("Admin Page")).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Show Coaches' }));
    screen.debug();
    await waitFor(() => expect(screen.getByText('Coaches')).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByText('FirstName1')).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByText('FirstName2')).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByText('FirstName3')).toBeInTheDocument(), { timeout: 2000 });
  });
  it('should render and click the show exercises button to display exercises', async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
    await waitFor(() => expect(screen.getByText("Admin Page")).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Show Exercises' }));
    await waitFor(() => expect(screen.getByText('Exercises')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name2')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name3')).toBeInTheDocument());
  });
});