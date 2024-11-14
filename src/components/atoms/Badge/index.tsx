import React from 'react';
import './index.scss';

type Record = {
  [key: string]: any;
};

type Option = Record;
interface Props {
  text: string;
  rounded?: boolean;
  dot?: boolean;
  status: string;
  onRemove?: (option: Option) => void | undefined;
}

export const Badge = ({ text, rounded, dot, status, onRemove }: Props) => {
  const getColorsByState = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return 'blue';
      case 'Inaktiv':
        return 'grey';
      case 'Nylig lagt til':
      case 'Fullført':
        return 'green';
      case 'Slettet':
        return 'red';
      case 'Planlagt':
      case 'Yellow':
        return 'yellow';
      default:
        return 'grey';
    }
  };

  return (
    <span
      className={`badge ${onRemove ? 'badge-removable' : ''} ${
        rounded ? 'badge-rounded' : ''
      } ${getColorsByState(status)}`}
    >
      {dot && <span className="dot" />} <span className="text">{text}</span>
      {onRemove && (
        <i
          className="ri-close-line badge-remove-icon"
          onClick={onRemove}
          role="presentation"
        />
      )}
    </span>
  );
};

Badge.defaultProps = {
  rounded: undefined,
  dot: undefined,
  onRemove: undefined
};
