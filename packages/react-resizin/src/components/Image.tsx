import React, { ImgHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { Options } from 'resizin';

import ResizinContext from './ResizinContext';

type RenderImageFnc = (url: string) => any;

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
    imgId: string;
    options?: Options;
    innerRef?: React.Ref<HTMLImageElement>;
    children?: RenderImageFnc | null;
}

/**
 * @example ../../docs/ImageComponent.md
 */

const Image = ({ imgId, options, innerRef, children, ...props }: ImageProps) => (
    <ResizinContext.Consumer>
        {buildUrl => {
            const url = buildUrl(imgId, options);

            return children ? children(url) : <img {...props} ref={innerRef} src={url} />;
        }}
    </ResizinContext.Consumer>
);

Image.propTypes = {
    /**
     * Image identificator.
     */
    imgId: PropTypes.string.isRequired,
    /**
     * Image modifiers as defined at `https://github.com/AckeeCZ/resizin-js/tree/master/docs/Modifiers.md`.
     */
    options: PropTypes.shape({}),
    /**
     * Function that provides image url as a first parameter. If passed it takes over the responsibility
     * for rendering an image.
     */
    children: PropTypes.func,
};

Image.defaultProps = {
    options: {},
    children: null,
};

export default Image;
