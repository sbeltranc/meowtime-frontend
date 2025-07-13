<script>
	import PeriodDropdown from './PeriodDropdown.svelte';
	
	let { title = "Leaderboard", subtitle = "", children, selectedPeriod = "week", onPeriodChange } = $props();
</script>

<div class="leaderboard-container">
	<div class="leaderboard-header">
		<h1 class="leaderboard-title">{title}</h1>
		<PeriodDropdown 
			selectedPeriod={selectedPeriod} 
			onPeriodChange={onPeriodChange} 
		/>
	</div>
	<div class="leaderboard-list">
		{@render children()}
	</div>
	<div class="leaderboard-footer">
		<p class="leaderboard-note">
			leaderboard data is updated every minute, changes may not show immediately
		</p>
	</div>
</div>

<style>
	.leaderboard-container {
		background-color: #f0f4f8;
		background-image: url("https://www.transparenttextures.com/patterns/billie-holiday.png");
		border: 2px solid #4a6b8540;
		border-radius: 24px;
		padding: 0;
		max-width: 800px;
		width: 100%;
		box-shadow: 0 8px 32px rgba(74, 107, 133, 0.15);
		backdrop-filter: blur(10px);
		overflow: hidden;
		margin-bottom: 20px;
	}

	.leaderboard-header {
		background-color: transparent;
		padding: 24px 24px 16px 24px;
		border-bottom: 1px solid rgba(74, 107, 133, 0.2);
	}

	.leaderboard-title {
		font-family: "Bakso Daging";
		font-size: 28px;
		color: var(--color);
		text-align: center;
		margin: 0;
	}
    
	.leaderboard-list {
		background-color: transparent;
		padding: 0;
	}

	.leaderboard-footer {
		background-color: transparent;
		padding: 16px 24px;
	}

	.leaderboard-note {
		color: var(--em-color);
		font-size: 12px;
		text-align: center;
		margin: 0;
		line-height: 1.4;
		opacity: 0.7;
	}
</style>
