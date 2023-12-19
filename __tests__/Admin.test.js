import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Admin from '../src/pages/admin.js';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Admin Component', () => {
  
});