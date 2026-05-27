'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => <div style={{ height: 320, borderRadius: 22, background: '#F2E8E0' }} />,
});

export function InteractiveMapClient() {
  return <InteractiveMap />;
}
