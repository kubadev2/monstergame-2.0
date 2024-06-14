import { http, createConfig } from '@wagmi/core';

// Importuj konfiguracje dla głównej sieci Cronos i sieci testowej Cronos
import { /*cronos,*/ cronosTestnet } from '@wagmi/core/chains';

// Utwórz konfigurację dla sieci testowej Cronos i głównej sieci Cronos
export const config = createConfig({
  chains: [/*cronos,*/ cronosTestnet],
  transports: {
    //[cronos.id]: http(), // Transport dla głównej sieci Cronos
    [cronosTestnet.id]: http(), // Transport dla sieci testowej Cronos
  },
});