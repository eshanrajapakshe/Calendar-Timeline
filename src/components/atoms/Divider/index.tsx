import React from 'react';
import './index.scss';

interface IProps {
  type: 'solid' | 'dashed';
  styles?: React.CSSProperties;
}

export const Divider = ({ type, styles }: IProps) => {
  return type === 'solid' ? (
    <hr className="divider-solid" style={styles} />
  ) : (
    <hr className="divider-dashed" style={styles} />
  );
};
