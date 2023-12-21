import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Admin from '../src/pages/admin.js';;
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Admin Component', () => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
  const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMzA0MzE4NywianRpIjoiYTZjZWIxZmMtMDIyNi00N2NhLTg1MzgtNDA2YmIyMjBiYjRlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzAzMDQzMTg3LCJleHAiOjE3MDMwNDY3ODcsInJvbGVfaWQiOjJ9.mOquznnaWYmrwYdRrJFk868LftF3fvQmfvyA82QnnWs';
  beforeEach(async () => {
    window.localStorage.setItem('accessToken', mockAccessToken);
    window.localStorage.setItem('refreshToken', mockAccessToken);
    jest.spyOn(window, 'prompt').mockImplementation((message) => {
      if(message.includes('Exercise name:')) return 'Name4';
      if(message.includes('Exercise description:')) return 'Description4';
      if(message.includes('Exercise equipment:')) return 'Equipment4';
      if(message.includes('Exercise muscle group:')) return 'MuscleGroup4';
    });
    window.alert = jest.fn();
    axios.put.mockImplementation(() => { return Promise.resolve({ status: 200 })});
    axios.post.mockImplementation(() => {
      return Promise.resolve({
        status: 201,
        data: {
          message: 'Exercise created successfully: 4'
        }
      });
    });
    axios.get.mockImplementation((url) => {
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
      } else if(url.includes('exercise')) {
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the admin page', async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
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
    await waitFor(() => expect(screen.getByText('Coaches')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('FirstName1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('FirstName2')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('FirstName3')).toBeInTheDocument());
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
    fireEvent.click(screen.getByRole('button', { name: 'Show Coaches' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Exercises' }));
    await waitFor(() => expect(screen.getByText('Exercises')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name2')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Name3')).toBeInTheDocument());
  });
  it("should render and click add exercise button to add a new exercise", async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
    await waitFor(() => expect(screen.getByText("Admin Page")).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Add Exercise' }));
    await waitFor(() => expect(screen.getByText('Name4')).toBeInTheDocument());
  });
  it("should render and click the activate and deactive button in excerise page", async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
    await waitFor(() => expect(screen.getByText("Admin Page")).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Show Exercises' }));
    const activate = screen.getAllByRole('button', { name: 'Activate' });
    const deactivate = screen.getAllByRole('button', { name: 'Deactivate' });
    fireEvent.click(activate[0]);
    fireEvent.click(deactivate[0]);
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(2));
  });
  it("should render and click the approve and disapprove button in coaches page", async () => {
    await act(async () => {
      render(
        <Router>
          <Admin />
        </Router>
      )
    });
    await waitFor(() => expect(screen.getByText("Admin Page")).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Show Coaches' }));
    await waitFor(() => expect(screen.getByText('Coaches')).toBeInTheDocument());
    const accept = screen.getAllByRole('button', { name: 'Accept' });
    const reject = screen.getAllByRole('button', { name: 'Deny' });
    fireEvent.click(accept[0]);
    fireEvent.click(reject[1]);
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(2));
  });
});