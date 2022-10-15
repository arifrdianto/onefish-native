import React, { memo, forwardRef } from 'react';
import type { IButtonGroupProps } from './types';
import { Stack } from '../Stack';
import { usePropsResolution } from '../../hooks';

export default memo(
  forwardRef(
    (
      { children, divider, variant, ...props }: IButtonGroupProps,
      ref?: any,
    ) => {
      const {
        space,
        direction,
        size,
        colorScheme,
        isDisabled,
        isAttached,
        ...newProps
      } = usePropsResolution('ButtonGroup', props);

      const { borderRadius } = usePropsResolution('Button', props);
      let computedChildren;

      if (Array.isArray(children)) {
        computedChildren = React.Children.toArray(children).map(
          (child: any, index: number) => {
            if (typeof child === 'string' || typeof child === 'number') {
              return child;
            }
            return React.cloneElement(child, {
              key: `button-group-child-${index}`,
              variant,
              size,
              colorScheme,
              isDisabled,

              // when buttons are attached, remove rounded corners of all buttons except extreme buttons
              ...(isAttached ? { borderRadius: 0 } : {}),
              ...(isAttached && index === 0
                ? direction === 'column'
                  ? { borderTopRadius: borderRadius }
                  : { borderLeftRadius: borderRadius }
                : {}),
              ...(isAttached && index === children?.length - 1
                ? direction === 'column'
                  ? { borderBottomRadius: borderRadius }
                  : { borderRightRadius: borderRadius }
                : {}),

              //when buttons are attached, remove double border from them, just keep borderRight in case for direction row and borderBottom in case of direction column for every component
              ...(isAttached && index !== 0
                ? direction === 'column'
                  ? { borderTopWidth: 0 }
                  : { borderLeftWidth: 0 }
                : {}),
              ...child.props,
            });
          },
        );
      } else {
        computedChildren = React.Children.toArray(children).map(
          (child: any, index: number) => {
            return React.cloneElement(child, {
              key: `button-group-child-${index}`,
              variant,
              size,
              colorScheme,
              isDisabled,
              ...child.props,
            });
          },
        );
      }

      return (
        <Stack
          divider={divider}
          space={isAttached ? 0 : space}
          direction={direction}
          {...newProps}
          ref={ref}>
          {computedChildren}
        </Stack>
      );
    },
  ),
);
