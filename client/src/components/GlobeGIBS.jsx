import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function proxyUrl(layer='BlueMarble_ShadedRelief', time='default', width=2048, height=1024){
  const p = new URLSearchParams({ layer, width, height });
  if(time) p.set('time', time);
  return `${API}/api/proxy/wms?${p.toString()}`;
}

export default function GlobeGIBS({ baseLayer='BlueMarble_ShadedRelief', overlayLayer=null, time='default' }){
  // build texture url via proxy
  const url = useMemo(()=> proxyUrl(baseLayer, time, 2048, 1024), [baseLayer, time]);
  const texture = useLoader(TextureLoader, url);

  return (
    <>
      <mesh>
        <sphereGeometry args={[1,64,64]} />
        <meshStandardMaterial map={texture} metalness={0.02} roughness={0.8} />
      </mesh>
      {/* overlay sphere could be added here as a second mesh scaled slightly up */}
    </>
  );
}