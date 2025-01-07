import React from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export function LensLogo() {
  const { RiveComponent } = useRive({
    src: 'https://www.lens.xyz/lens-spin.riv',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center
    }),
    onError: (e) => {
      console.error('Rive animation error:', e);
    }
  });

  return (
    <div className="w-8 h-8 relative">
      {RiveComponent && <RiveComponent />}
    </div>
  );
}