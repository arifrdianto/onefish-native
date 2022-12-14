import React, { memo, forwardRef } from 'react';
import { useToken, usePropsResolution } from '../../hooks';
import { makeStyledComponent } from '../../utils/styled';
import Text from '../Text';
import { Svg, G } from './nbSvg';
import type { IIconProps } from './types';

const SVG = makeStyledComponent(Svg);

const SVGIcon = ({ children, ...props }: IIconProps, ref: any) => {
  const { focusable, stroke, color, size, ...resolvedProps } =
    usePropsResolution('Icon', props);
  const strokeHex = useToken('colors', stroke || '');
  const colorHex = useToken('colors', color || '');

  return (
    <SVG
      {...resolvedProps}
      size={size}
      color={colorHex}
      stroke={strokeHex}
      focusable={focusable}
      accessibilityRole="image"
      ref={ref}
    >
      {React.Children.count(children) > 0 ? (
        <G>
          {React.Children.map(children, (child, i) => (
            <ChildPath
              key={child?.key ?? i}
              element={child}
              {...child?.props}
            />
          ))}
        </G>
      ) : (
        <Text>?</Text>
      )}
    </SVG>
  );
};
const ChildPath = ({ element, fill, stroke: pathStroke }: any) => {
  const pathStrokeColor = useToken('colors', pathStroke || '');
  const fillColor = useToken('colors', fill || '');

  if (!element) {
    return null;
  }

  return React.cloneElement(element, {
    fill: fillColor ? fillColor : 'currentColor',
    stroke: pathStrokeColor,
  });
};
export default memo(forwardRef(SVGIcon));
