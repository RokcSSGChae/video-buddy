/* eslint-disable */
export const noop = () => {};
export const noopPromise = () => Promise<void>;
export const isFunction = (value: any): value is Function => typeof value === 'function';
