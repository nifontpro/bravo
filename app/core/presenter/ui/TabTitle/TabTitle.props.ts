import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export type TabTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  count: number;
  onClickActive: SetStateAction<'' | 'AWARD' | 'NOMINEE' | 'DELETE_USER'>;
  active: '' | 'AWARD' | 'NOMINEE' | 'DELETE_USER';
  setActive: Dispatch<SetStateAction<'' | 'AWARD' | 'NOMINEE' | 'DELETE_USER'>>;
};
