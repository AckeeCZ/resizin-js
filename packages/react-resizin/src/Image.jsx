import React from 'react';
import PropTypes from 'prop-types';

import ResizinContext from './ResizinContext';

const Image = ({ imgId, options, ...props }) => (
    <ResizinContext.Consumer>
        {buildUrl => {
            const url = buildUrl(imgId, options);

            return children ? children(url) : <img {...props} src={url} />;
        }}
    </ResizinContext.Consumer>
);

Image.propTypes = {
    imgId: PropTypes.string.isRequired,
    options: PropTypes.shape({

    }),
    children: PropTypes.func,
};

Image.defaultProps = {
    options: {},
    children: null,
};

export default Image;
