import React from 'react';
import PropTypes from 'prop-types';
import { buildUrlFactory, ClientOptions } from 'resizin';

import ResizinContext from './ResizinContext';

interface ProviderProps {
    config: ClientOptions;
}

const Provider: React.SFC<ProviderProps> = ({ config }) => {
    const buildUrl = React.useMemo(() => buildUrlFactory(config), [config]);

    return <ResizinContext.Provider value={buildUrl}></ResizinContext.Provider>;
};

Provider.propTypes = {
    config: PropTypes.shape({
        serverUrl: PropTypes.string,
        bucket: PropTypes.string.isRequired,
    }).isRequired,
};

export default Provider;
