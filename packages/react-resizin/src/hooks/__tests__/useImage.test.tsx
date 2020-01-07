import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { buildUrlFactory } from 'resizin';

import ResizinProvider from '../../components/Provider';

import useImage from '../useImage';

jest.mock('resizin');

describe('Image', () => {
    const buildUrlMock = jest.fn().mockReturnValue('http://image-url');

    beforeAll(() => {
        (buildUrlFactory as jest.Mock).mockReturnValue(buildUrlMock);
    });

    it('throw when hook used out of ResizinProvier', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useImage('foo'));

        expect(result.error.message).toMatch(/could not find Resizin context value/);

        spy.mockRestore();
    });

    it('return image url', () => {
        const wrapper = ({ children }) => <ResizinProvider bucket="foo">{children}</ResizinProvider>;
        const { result } = renderHook(() => useImage('baz'), { wrapper });

        expect(result.current).toEqual('http://image-url');
    });
});
