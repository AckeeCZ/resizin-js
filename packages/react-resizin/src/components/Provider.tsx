import React from 'react';
import type { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { buildUrlFactory } from 'resizin';

import ResizinContext from './ResizinContext';

interface ProviderProps {
    serverUrl?: string;
    bucket: string;
    children: ReactNode;
}

/**
 * @example ../../docs/ProviderComponent.md
 */
const Provider = ({ serverUrl, bucket, children }: ProviderProps) => {
    const buildUrl = React.useMemo(() => buildUrlFactory({ serverUrl, bucket }), [serverUrl, bucket]);

    return <ResizinContext.Provider value={buildUrl}>{children}</ResizinContext.Provider>;
};

Provider.propTypes = {
    /**
     * Image server url. It defaults to `https://img.resizin.com`.
     */
    serverUrl: PropTypes.string,
    /**
     * Name of your image server instance bucket.
     */
    bucket: PropTypes.string.isRequired,
};

export default Provider;
