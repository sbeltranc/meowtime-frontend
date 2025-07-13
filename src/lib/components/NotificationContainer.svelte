<script>
	import { notifications } from './notifications.js';
	import { fly } from 'svelte/transition';
	import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@fvilers/heroicons-svelte/24/solid';
	
	/**
	 * @param {string} id
	 */
	function dismissNotification(id) {
		notifications.update(items => items.filter(item => item.id !== id));
	}
	
	/**
	 * @param {'success' | 'error' | 'warning' | 'info'} type
	 */
	function getIconComponent(type) {
		switch (type) {
			case 'success': return CheckCircleIcon;
			case 'error': return XCircleIcon;
			case 'warning': return ExclamationTriangleIcon;
			case 'info': return InformationCircleIcon;
			default: return InformationCircleIcon;
		}
	}
</script>

<div class="notification-container">
	{#each $notifications as notification (notification.id)}
		<div 
			class="notification notification--{notification.type}"
			in:fly={{ x: 100, opacity: 0, duration: 300 }}
			out:fly={{ x: 100, opacity: 0, duration: 300 }}
		>
			<div class="notification__icon">
				<svelte:component this={getIconComponent(notification.type)} className="w-[18px] h-[18px]" />
			</div>
			<div class="notification__content">
				<p class="notification__message">{notification.message}</p>
			</div>
			{#if notification.dismissible}
				<button 
					class="notification__dismiss"
					onclick={() => dismissNotification(notification.id)}
					aria-label="Dismiss notification"
				>
					<XMarkIcon className="w-[14px] h-[14px]" />
				</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	.notification-container {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 380px;
		width: 100%;
		pointer-events: none;
	}

	.notification {
		background-color: #f0f4f8;
		background-image: url("https://www.transparenttextures.com/patterns/billie-holiday.png");
		border: 2px solid rgba(74, 107, 133, 0.3);
		border-radius: 24px;
		padding: 16px 20px;
		box-shadow: 0 8px 32px rgba(74, 107, 133, 0.15);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		gap: 12px;
		pointer-events: auto;
		font-family: var(--font-stack);
		min-width: 300px;
		position: relative;
		transform: translateY(0);
		transition: all 0.25s ease;
		margin: 8px 0;
	}

	.notification::before {
		content: '';
		position: absolute;
		top: -8px;
		left: -8px;
		right: -8px;
		bottom: -8px;
		z-index: -1;
	}

	.notification:hover {
		box-shadow: 0 12px 40px rgba(74, 107, 133, 0.2);
		border-color: rgba(74, 107, 133, 0.4);
	}

	.notification--success {
		border-color: rgba(16, 185, 129, 0.4);
	}

	.notification--success .notification__icon {
		color: #10b981;
		background: rgba(16, 185, 129, 0.15);
	}

	.notification--error {
		border-color: rgba(239, 68, 68, 0.4);
	}

	.notification--error .notification__icon {
		color: #ef4444;
		background: rgba(239, 68, 68, 0.15);
	}

	.notification--warning {
		border-color: rgba(245, 158, 11, 0.4);
	}

	.notification--warning .notification__icon {
		color: #f59e0b;
		background: rgba(245, 158, 11, 0.15);
	}

	.notification--info {
		border-color: rgba(74, 107, 133, 0.4);
	}

	.notification--info .notification__icon {
		color: #4a6b85;
		background: rgba(74, 107, 133, 0.15);
	}

	.notification__icon {
		width: 36px;
		height: 36px;
		border-radius: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.notification__icon :global(svg) {
		width: 18px;
		height: 18px;
		fill: currentColor;
	}

	.notification__content {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
	}

	.notification__message {
		margin: 0;
		font-size: 15px;
		line-height: 1.5;
		color: var(--color);
		word-wrap: break-word;
		font-weight: 500;
	}

	.notification__dismiss {
		background: transparent;
		border: 1px solid rgba(74, 107, 133, 0.3);
		color: var(--em-color);
		cursor: pointer;
		border-radius: 14px;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.7;
	}

	.notification__dismiss :global(svg) {
		width: 14px;
		height: 14px;
		fill: currentColor;
	}

	.notification__dismiss:hover {
		opacity: 1;
		background: rgba(74, 107, 133, 0.1);
		border-color: rgba(74, 107, 133, 0.4);
		transform: scale(1.05);
	}

	@media (max-width: 640px) {
		.notification-container {
			top: 16px;
			right: 16px;
			left: 16px;
			max-width: none;
		}

		.notification {
			min-width: auto;
			padding: 16px;
		}

		.notification__icon {
			width: 36px;
			height: 36px;
		}

		.notification__message {
			font-size: 14px;
		}
	}
</style>
