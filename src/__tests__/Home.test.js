import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home/Home';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

// Mock the SearchBar component
jest.mock('../components/SearchBar/SearchBar', () => (props) => (
  <div data-testid="search-bar">
    <button onClick={() => {
      props.setCharacterdata([{ id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', location: { name: 'Earth' }, origin: { name: 'Earth (C-137)' } }]);
      props.setTotalPages(2); // Simulate total pages as 2
    }}>Search</button>
  </div>
));

// Mock the Characters component
jest.mock('../pages/Characters/Characters', () => (props) => (
  <div data-testid="characters">
    {props.characterdata.map((character) => (
      <div key={character.id}>{character.name}</div>
    ))}
    <button onClick={() => props.setPage((prev) => Math.max(prev - 1, 1))} disabled={props.page === 1}>Previous</button>
    <button onClick={() => props.setPage((prev) => Math.min(prev + 1, props.totalPages))} disabled={props.page === props.totalPages}>Next</button>
  </div>
));

describe('Home component', () => {
  test('renders header', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('The Rick and Morty API')).toBeInTheDocument();
  });

  test('renders SearchBar and Characters components', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('characters')).toBeInTheDocument();
  });

  test('updates character data and total pages when search button is clicked', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Simulate search button click in SearchBar
    fireEvent.click(screen.getByText('Search'));

    // Check if character data is updated
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    // Check if pagination buttons are rendered
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('updates page state when pagination buttons are clicked', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Simulate search button click in SearchBar to set character data
    fireEvent.click(screen.getByText('Search'));

    // Check if the next button is enabled and click it
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeEnabled();
    fireEvent.click(nextButton);

    // Check if the page state is updated
    expect(nextButton).toBeDisabled();

    // Check if the previous button is enabled after clicking next
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeEnabled();
  });
});
