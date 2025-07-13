<script>
	import LeaderboardContainer from '$lib/components/LeaderboardContainer.svelte';
	import LeaderboardEntry from '$lib/components/LeaderboardEntry.svelte';
	import LeaderboardSkeleton from '$lib/components/LeaderboardSkeleton.svelte';
	import { onMount } from 'svelte';

	// Sample data based on the image
	const sampleData = [
		{
			rank: 1,
			username: 'sbeltranc',
			avatar: 'https://github.com/identicons/user1.png',
			status: "Working on Visual Studio Code",
			time: '18h 28m 35s'
		}
	];

	let isLoading = true;
	let leaderboardData = sampleData;
	let selectedPeriod = "week";

	/**
	 * @param {string} period
	 */
	function handlePeriodChange(period) {
		selectedPeriod = period;
		// Here you would typically fetch new data based on the selected period
		console.log("Period changed to:", period);
		
		// Simulate loading new data
		isLoading = true;
		setTimeout(() => {
			// In a real app, you'd fetch different data based on the period
			leaderboardData = sampleData;
			isLoading = false;
		}, 1000);
	}

	onMount(() => {
		// Simulate API loading
		setTimeout(() => {
			leaderboardData = sampleData;
			isLoading = false;
		}, 2000); // 2 second loading simulation
	});
</script>

<svelte:head>
    <title>meowtime - leaderboard</title>
</svelte:head>

<div class="leaderboard-page">
	<LeaderboardContainer 
		title="Leaderboard" 
		subtitle=""
		selectedPeriod={selectedPeriod}
		onPeriodChange={handlePeriodChange}
	>
		{#if isLoading}
			{#each Array(10) as _, i}
				<LeaderboardSkeleton />
			{/each}
		{:else}
			{#each leaderboardData as entry}			<LeaderboardEntry 
				rank={entry.rank}
				username={entry.username}
				avatar={entry.avatar}
				status={entry.status}
				time={entry.time}
				isHighlighted={entry.rank === 7} 
			/>
			{/each}
		{/if}
	</LeaderboardContainer>
</div>

<style>
	.leaderboard-page {
		margin-top: 30px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>