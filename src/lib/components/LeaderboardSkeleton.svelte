<div class="skeleton-entry">
	<div class="skeleton-rank"></div>
	<div class="skeleton-user-info">
		<div class="skeleton-avatar"></div>
		<div class="skeleton-user-details">
			<div class="skeleton-username"></div>
			<div class="skeleton-status"></div>
		</div>
	</div>
	<div class="skeleton-time"></div>
</div>

<style>
	.skeleton-entry {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px;
		background-color: rgba(107, 141, 181, 0.08);
		border-bottom: 1px solid rgba(74, 107, 133, 0.15);
		color: var(--color);
		font-family: var(--font-stack);
	}

	.skeleton-rank {
		width: 20px;
		height: 20px;
		background: linear-gradient(90deg, rgba(107, 141, 181, 0.1) 25%, rgba(107, 141, 181, 0.2) 50%, rgba(107, 141, 181, 0.1) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 4px;
		min-width: 40px;
	}

	.skeleton-user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		margin-left: 20px;
	}

	.skeleton-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(90deg, rgba(107, 141, 181, 0.1) 25%, rgba(107, 141, 181, 0.2) 50%, rgba(107, 141, 181, 0.1) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.skeleton-user-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.skeleton-username {
		width: 120px;
		height: 16px;
		background: linear-gradient(90deg, rgba(107, 141, 181, 0.1) 25%, rgba(107, 141, 181, 0.2) 50%, rgba(107, 141, 181, 0.1) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 4px;
	}

	.skeleton-status {
		width: 80px;
		height: 12px;
		background: linear-gradient(90deg, rgba(107, 141, 181, 0.1) 25%, rgba(107, 141, 181, 0.2) 50%, rgba(107, 141, 181, 0.1) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 4px;
	}

	.skeleton-time {
		width: 80px;
		height: 16px;
		background: linear-gradient(90deg, rgba(107, 141, 181, 0.1) 25%, rgba(107, 141, 181, 0.2) 50%, rgba(107, 141, 181, 0.1) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 4px;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	/* Random width variations for more realistic skeleton */
	.skeleton-entry:nth-child(2) .skeleton-username {
		width: 100px;
	}

	.skeleton-entry:nth-child(3) .skeleton-username {
		width: 140px;
	}

	.skeleton-entry:nth-child(4) .skeleton-status {
		width: 100px;
	}

	.skeleton-entry:nth-child(5) .skeleton-username {
		width: 90px;
	}

	.skeleton-entry:nth-child(6) .skeleton-time {
		width: 70px;
	}

	.skeleton-entry:nth-child(7) .skeleton-username {
		width: 110px;
	}

	.skeleton-entry:nth-child(8) .skeleton-status {
		width: 60px;
	}
</style>
