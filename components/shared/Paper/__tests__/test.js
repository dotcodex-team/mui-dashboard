import React from 'react';
import { render } from 'react-testing-library';

import Paper from '..';

describe('Paper - component', () => {
  it('renders children', () => {
    const children = 'some text';

    const { getByText } = render(<Paper>{children}</Paper>);
    expect(getByText(children)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Paper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
