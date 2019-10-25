import React from 'react';
import { BuildUrlFnc } from 'resizin';

const ResizinContext = React.createContext<BuildUrlFnc>(null as any);
ResizinContext.displayName = 'ResizinContext';

export default ResizinContext;
