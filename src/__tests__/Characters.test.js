import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Characters from '../pages/Characters/Characters';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockCharacterData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    location: { name: 'Earth' },
    origin: { name: 'Earth (C-137)' },
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Earth' },
    origin: { name: 'unknown' },
  },
];

describe('Characters component', () => {
  test('renders character cards', () => {
    render(
      <BrowserRouter>
        <Characters characterdata={mockCharacterData} page={1} setPage={() => {}} totalPages={1} />
      </BrowserRouter>
    );

    const characterNames = mockCharacterData.map((character) => character.name);
    characterNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('disables previous button on first page', () => {
    render(
      <BrowserRouter>
        <Characters characterdata={mockCharacterData} page={1} setPage={() => {}} totalPages={2} />
      </BrowserRouter>
    );

    const prevButton = screen.getByText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <BrowserRouter>
        <Characters characterdata={mockCharacterData} page={2} setPage={() => {}} totalPages={2} />
      </BrowserRouter>
    );

    const nextButton = screen.getByText(/next/i);
    expect(nextButton).toBeDisabled();
  });

  test('calls setPage on next button click', () => {
    const setPage = jest.fn();
    render(
      <BrowserRouter>
        <Characters characterdata={mockCharacterData} page={1} setPage={setPage} totalPages={2} />
      </BrowserRouter>
    );

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });

  test('calls setPage on previous button click', () => {
    const setPage = jest.fn();
    render(
      <BrowserRouter>
        <Characters characterdata={mockCharacterData} page={2} setPage={setPage} totalPages={2} />
      </BrowserRouter>
    );

    const prevButton = screen.getByText(/previous/i);
    fireEvent.click(prevButton);
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });
});
