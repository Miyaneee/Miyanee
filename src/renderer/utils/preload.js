const miyanee = window.miyanee

/** @type {string} */
export const version = miyanee.version

const renderer = miyanee.renderer

/**
 * @callback Send
 * @param {string} channel
 * @param {*} data
 */
/**
 * Send to main process
 * @type {Send}
 */
export const rendererSend = renderer.send

/**
 * @callback On
 * @param {string} channel
 * @param {function} callback
 */
/**
 * Watch channel
 * @type {On}
 */
export const rendererOn = renderer.on

/**
 * @callback Once
 * @param {string} channel
 * @param {function} callback
 */
/**
 * Watch channel once
 * @type {Once}
 */
export const rendererOnce = renderer.once

/**
 * @callback RemoveAllListeneers
 * @param {string} channel
 */
/**
 * Remove all listeners of a channel
 * @type {RemoveAllListeneers}
 */
export const rendererRemoveAllListeneers = renderer.removeAllListeneers
