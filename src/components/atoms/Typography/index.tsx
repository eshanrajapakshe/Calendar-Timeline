import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'baseRegular'
    | 'baseMedium'
    | 'smallRegular'
    | 'smallMedium'
    | 'smallLink'
    | 'smallBold'
    | 'extraSmallRegular'
    | 'extraSmallMedium';
  color?: string;
  style?: CSSProperties;
  children?: string | number | React.ReactNode;
  customClassName?: string;
}

interface ITypography {
  [key: string]: string | any;
}

const variantsMapping: ITypography = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  baseRegular: 'h6',
  baseMedium: 'h6',
  smallRegular: 'h6',
  smallMedium: 'h6',
  smallLink: 'p',
  smallBold: 'p',
  extraSmallRegular: 'p',
  extraSmallMedium: 'p'
};

export const Typography = ({
  variant,
  color,
  style,
  children,
  customClassName,
  ...rest
}: Props) => {
  const Component = variant ? variantsMapping[variant] : 'p';

  return (
    <Component
      className={classNames(
        {
          [`typography--variant-${variant}`]: variant,
          [`typography--color-${color}`]: color
        },
        variant === 'h1' ||
          variant === 'h2' ||
          variant === 'h3' ||
          variant === 'h4' ||
          variant === 'h5'
          ? 'typography-header'
          : 'typography-body',
        customClassName || ''
      )}
      {...rest}
      style={style}
    >
      {children}
    </Component>
  );
};

Typography.defaultProps = {
  color: 'primary',
  children: undefined,
  style: undefined
};
