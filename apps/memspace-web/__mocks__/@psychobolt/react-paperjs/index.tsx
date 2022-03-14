import React, { forwardRef } from 'react';

const createMockComponent = (name: string) => {
  const MockComponent = forwardRef<HTMLDivElement>(function Component(
    props: any,
    ref
  ) {
    return (
      <div data-testid={name} ref={ref} key={props.key}>
        <div data-testid={`${name}Data`}>
          {JSON.stringify({ ...props, children: null })}
        </div>
        {props.children}
      </div>
    );
  });

  return MockComponent;
};

export const Layer = createMockComponent('Layer');
export const Raster = createMockComponent('Raster');
export const PointText = createMockComponent('PointText');
export const PaperContainer = createMockComponent('PaperContainer');
