import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Weather from './Weather';

describe('Query mock server', () => {
  const server = setupServer(
    rest.get('https://api.openweathermap.org/data/2.5/weather',
    async (req, res, context) =>
      res(
        context.status(200),
        context.json({
          weather: [
            { icon: '4n', main: 'Clouds', description: 'Cloudy' }
          ]
        })
      )
    )
  )

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('mock server', async () => {
    const {baseElement} = render(<Weather />);
    const img = await screen.findByRole('img', {}, { timeout: 3000 });
    expect(img).toHaveAttribute('alt', 'Clouds');
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(baseElement);
  });
});
