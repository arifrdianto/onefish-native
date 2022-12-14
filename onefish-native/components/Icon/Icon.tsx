import React, { memo, forwardRef } from 'react';
import { useToken, usePropsResolution } from '../../hooks';
import type { IIconProps } from './types';
import SVGIcon from './SVGIcon';
import { Factory } from '../../factory';

const Icon = (props: IIconProps, ref?: any) => {
  const { as, size, ...resolvedProps } = usePropsResolution('Icon', props);
  const tokenizedFontSize = useToken('space', size);

  if (!as) {
    return <SVGIcon size={size} {...resolvedProps} ref={ref} />;
  }
  const isJSX = React.isValidElement(as);
  const StyledAs = Factory(
    isJSX
      ? // eslint-disable-next-line @typescript-eslint/no-shadow
        resolvedProps =>
          React.cloneElement(
            as,
            // @ts-ignore
            { ...resolvedProps, ...as.props },
          )
      : as,
  );
  return (
    <StyledAs
      {...resolvedProps}
      fontSize={tokenizedFontSize}
      lineHeight={tokenizedFontSize}
      size={size}
      ref={ref}
    />
  );
};

export default memo(forwardRef(Icon));
