import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        fit?: 'cover' | 'contain' | 'fill';
        mask?: string;
        placeholder?: string;
        position?: string;
        radius?: string | number;
        shape?: 'rect' | 'rounded' | 'circle' | 'pill';
        src?: string;
      };
    }
  }
}

export {};
