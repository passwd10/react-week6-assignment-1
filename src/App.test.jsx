import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [{ id: 1, name: '서울' }],
      categories: [],
      restaurants: [],
      restaurantDetail: {
        name: '',
        address: '',
        menuItems: [],
        reviews: [],
      },
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('with path /', () => {
    it('renders the home page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('renders the about page', () => {
      const { container } = renderApp({ path: '/about' });

      expect(container).toHaveTextContent('20명에게 추천');
    });
  });

  context('with path /restaurants', () => {
    it('renders the restaurants page', () => {
      const { container } = renderApp({ path: '/restaurants' });

      expect(container).toHaveTextContent('서울');
    });
  });

  context('with path /restaurants/restaurantId', () => {
    it('renders the restaurants detail page', () => {
      const { container } = renderApp({ path: '/restaurants/1' });

      expect(container).toHaveTextContent('메뉴');
      expect(container).toHaveTextContent('리뷰');
    });
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderApp({ path: '/xxx' });

      expect(container).toHaveTextContent('Not Found');
    });
  });
});
