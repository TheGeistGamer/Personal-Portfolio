import { useEffect } from 'react';
import { usePortfolioInteractions } from '../hooks/usePortfolioInteractions';

export const PortfolioInteractions = () => {
  usePortfolioInteractions();

  useEffect(() => {
    import('../scripts/image-slot.js');
  }, []);

  return null;
};
