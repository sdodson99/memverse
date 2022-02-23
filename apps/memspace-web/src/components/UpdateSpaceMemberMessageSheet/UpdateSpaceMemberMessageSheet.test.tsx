import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessageSheet, {
  UpdateSpaceMemberMessageSheetProps,
} from './UpdateSpaceMemberMessageSheet';

describe('<UpdateSpaceMemberMessageSheet />', () => {
  let props: UpdateSpaceMemberMessageSheetProps;

  beforeEach(() => {
    props = {
      open: true,
    };
  });

  it('should mount', () => {
    render(<UpdateSpaceMemberMessageSheet {...props} />);

    const updateSpaceMemberMessageSheet = screen.getByTestId(
      'UpdateSpaceMemberMessageSheet'
    );

    expect(updateSpaceMemberMessageSheet).toBeInTheDocument();
  });
});
