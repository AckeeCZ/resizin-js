import React from 'react';
import { render } from '@testing-library/react';
import { buildUrlFactory } from 'resizin';

import ResizinProvider from '../Provider';
import Image from '../Image';

jest.mock('resizin', () => ({
    buildUrlFactory: jest.fn(),
}));

describe('Image', () => {
    const buildUrlMock = jest.fn();

    beforeAll(() => {
        buildUrlFactory.mockReturnValue(buildUrlMock);
    });

    beforeEach(() => {
        buildUrlMock.mockReset();
    });

    it('render image as img element', () => {
        buildUrlMock.mockReturnValue('fake-image-url');

        const { getByAltText } = render(
            <ResizinProvider bucket="">
                <Image imgId="foo" alt="test" />
            </ResizinProvider>,
        );

        expect(getByAltText('test')).toHaveAttribute('src', 'fake-image-url');
    });

    it('delegate image rendering to provided children function', () => {
        const renderFnc = jest.fn().mockReturnValue(null);
        buildUrlMock.mockReturnValue('fake-image-url2');

        const { getByAltText } = render(
            <ResizinProvider bucket="">
                <Image imgId="foo" alt="test">
                    {renderFnc}
                </Image>
            </ResizinProvider>,
        );

        expect(renderFnc).toHaveBeenCalledWith('fake-image-url2');
    });
});
