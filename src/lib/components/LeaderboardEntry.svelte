<script>
	let { rank, username, avatar, status, time, isHighlighted = false } = $props();
</script>

<div class="leaderboard-entry" class:highlighted={isHighlighted}>
	<div class="rank">
		{rank}
	</div>
	<div class="user-info">
		<div class="avatar-container">
			<img src={avatar} alt="{username}'s avatar" class="avatar" />
		</div>
		<div class="user-details">
			<div class="user-text">
				<span class="username">@{username}</span>
				{#if status}
					<div class="status">{status}</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="time">
		{time}
	</div>
</div>

<style>
	.leaderboard-entry {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px;
		background-color: rgba(107, 141, 181, 0.08);
		border-bottom: 1px solid rgba(74, 107, 133, 0.15);
		transition: all 0.3s ease;
		color: var(--color);
		font-family: var(--font-stack);
	}

	.leaderboard-entry:hover {
		background-color: rgba(107, 141, 181, 0.15);
		transform: translateX(2px);
		box-shadow: 0 2px 8px rgba(74, 107, 133, 0.15);
	}

	.leaderboard-entry.highlighted {
		background-color: rgba(107, 141, 181, 0.2);
		border-left: 4px solid var(--em-color);
		box-shadow: 0 0 15px rgba(107, 141, 181, 0.25);
	}

	.rank {
		font-size: 16px;
		font-weight: 600;
		color: var(--color);
		min-width: 40px;
		text-align: center;
	}

	.leaderboard-entry.highlighted .rank {
		color: var(--em-color);
		font-weight: 700;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		margin-left: 20px;
	}

	.avatar-container {
		position: relative;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 2px solid rgba(74, 107, 133, 0.3);
		transition: border-color 0.3s ease;
	}

	.leaderboard-entry:hover .avatar {
		border-color: var(--em-color);
	}

	.user-details {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		flex-wrap: wrap;
	}

	.user-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.username {
		color: var(--em-color);
		font-weight: 500;
		font-size: 14px;
	}

	.status {
		color: var(--color);
		font-size: 11px;
		opacity: 0.7;
		font-style: italic;
		line-height: 1.2;
	}

	.time {
		font-size: 14px;
		font-weight: 500;
		color: var(--color);
		min-width: 80px;
		text-align: right;
	}

	.leaderboard-entry.highlighted .time {
		color: var(--em-color);
		font-weight: 600;
	}
</style>
