import { render } from '@testing-library/react';

import Map from './Map';

describe('SharedMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Map
        position={{ longitude: 0, latitude: 0 }}
        setPosition={() => console.log('Hello')}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
