import { writable } from 'svelte/store';

/**
 * @typedef {Object} Notification
 * @property {string} id - Unique identifier
 * @property {string} message - Notification message
 * @property {'success' | 'error' | 'warning' | 'info'} type - Notification type
 * @property {number} duration - Duration in milliseconds (0 = persistent)
 * @property {boolean} dismissible - Whether the notification can be dismissed
 */

/** @type {import('svelte/store').Writable<Notification[]>} */
export const notifications = writable([]);

let notificationId = 0;

/**
 * Add a notification
 * @param {string} message - The notification message
 * @param {'success' | 'error' | 'warning' | 'info'} type - The notification type
 * @param {object} options - Additional options
 * @param {number} [options.duration=5000] - Duration in ms (default: 5000, 0 = persistent)
 * @param {boolean} [options.dismissible=true] - Can be manually dismissed (default: true)
 * @returns {string} The notification ID
 */
function addNotification(message, type = 'info', options = {}) {
	const id = `notification-${++notificationId}`;
	const { duration = 5000, dismissible = true } = options;

	const notification = {
		id,
		message,
		type,
		duration,
		dismissible
	};

	notifications.update(items => [...items, notification]);

	if (duration > 0) {
		setTimeout(() => {
			removeNotification(id);
		}, duration);
	}

	return id;
}

/**
 * Remove a specific notification
 * @param {string} id - The notification ID to remove
 */
function removeNotification(id) {
	notifications.update(items => items.filter(item => item.id !== id));
}

/**
 * Clear all notifications
 */
function clearAllNotifications() {
	notifications.set([]);
}

// Convenience functions for different notification types
export const notify = {
	/**
	 * Show a success notification
	 * @param {string} message
	 * @param {object} [options={}]
	 */
	success: (message, options = {}) => addNotification(message, 'success', options),

	/**
	 * Show an error notification
	 * @param {string} message
	 * @param {object} [options={}]
	 */
	error: (message, options = {}) => addNotification(message, 'error', { duration: 0, ...options }),

	/**
	 * Show a warning notification
	 * @param {string} message
	 * @param {object} [options={}]
	 */
	warning: (message, options = {}) => addNotification(message, 'warning', options),

	/**
	 * Show an info notification
	 * @param {string} message
	 * @param {object} [options={}]
	 */
	info: (message, options = {}) => addNotification(message, 'info', options),

	/**
	 * Remove a notification
	 * @param {string} id
	 */
	remove: removeNotification,

	/**
	 * Clear all notifications
	 */
	clear: clearAllNotifications
};
