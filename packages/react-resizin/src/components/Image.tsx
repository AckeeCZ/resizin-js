import React, { ImgHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { Options, Formats } from 'resizin';

import ResizinContext from './ResizinContext';

type RenderImageFnc = (url: string) => any;

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    imgId: string;
    options?: Options;
    format?: Formats;
    innerRef?: React.Ref<HTMLImageElement>;
    children?: RenderImageFnc | null;
}

/**
 * @example ../../docs/ImageComponent.md
 */

const Image: React.FunctionComponent<ImageProps> = ({ imgId, options, format, innerRef, children, ...props }) => (
    <ResizinContext.Consumer>
        {buildUrl => {
            const url = buildUrl(imgId, options, format);

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
    format: PropTypes.oneOf(['o_jpg', 'o_webp', '']),
};

Image.defaultProps = {
    options: {},
    children: null,
    format: '',
};

export default Image;
