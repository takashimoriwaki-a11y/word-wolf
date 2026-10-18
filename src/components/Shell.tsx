import type { ReactNode } from 'react';
import { Mascots } from './Mascots';

type Props = {
  children: ReactNode;
  showMascots?: boolean;
  className?: string;
};

export function Shell({ children, showMascots = true, className = '' }: Props) {
  return (
    <div className={`app-shell ${className}`}>
      <div className="app-content">{children}</div>
      {showMascots && <Mascots />}
    </div>
  );
}
