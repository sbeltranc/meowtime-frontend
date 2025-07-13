<script>
	import Dropdown from './Dropdown.svelte';
	
	let { selectedPeriod = "week", onPeriodChange } = $props();
	
	const periodOptions = [
		{ value: "today", label: "today" },
		{ value: "week", label: "this week" },
		{ value: "month", label: "this month" }
	];
	
	/**
	 * @param {string} value
	 */
	function handlePeriodSelect(value) {
		if (onPeriodChange) {
			onPeriodChange(value);
		}
	}
</script>

<div class="period-selector">
	<Dropdown 
		options={periodOptions}
		selectedValue={selectedPeriod}
		onSelectionChange={handlePeriodSelect}
		label="Top project creators"
		placeholder="this week"
		minWidth="120px"
	/>
</div>

<style>
	.period-selector {
		margin-top: 8px;
	}
</style>
