import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PinInputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  digits: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>
};
