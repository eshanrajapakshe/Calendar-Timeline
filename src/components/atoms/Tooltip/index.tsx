import React, { JSXElementConstructor, ReactElement } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './index.scss';

interface Props {
  text: string | React.ReactNode;
  place: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  animation?: 'shift-away' | 'shift-toward' | 'perspective' | 'fade' | 'scale';
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  wrapperClassName?: string;
}

export const Tooltip = ({
  text,
  place = 'top',
  delay,
  disabled = false,
  animation,
  children,
  wrapperClassName
}: Props) => {
  return (
    <Tippy
      content={text}
      placement={place}
      delay={delay || 0}
      disabled={disabled}
      animation={animation}
    >
      <span className={wrapperClassName || ''}>{children}</span>
    </Tippy>
  );
};
