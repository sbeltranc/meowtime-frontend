<script>
	let { 
		options = [], 
		selectedValue = "", 
		onSelectionChange,
		placeholder = "Select an option",
		label = "",
		minWidth = "100px"
	} = $props();
	
	let dropdownOpen = $state(false);
	
	/**
	 * @param {string} value
	 */
	function handleOptionSelect(value) {
		dropdownOpen = false;
		if (onSelectionChange) {
			onSelectionChange(value);
		}
	}
	
	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function getSelectedLabel() {
		const selected = options.find(option => option.value === selectedValue);
		return selected ? selected.label : placeholder;
	}
</script>

<div class="dropdown-wrapper">
	{#if label}
		<span class="dropdown-label">{label}</span>
	{/if}
	<div class="dropdown" class:open={dropdownOpen}>
		<button class="dropdown-trigger" onclick={toggleDropdown} style="min-width: {minWidth}">
			{getSelectedLabel()}
			<span class="dropdown-arrow" class:rotated={dropdownOpen}>▼</span>
		</button>
		{#if dropdownOpen}
			<div class="dropdown-menu">
				{#each options as option}
					<button 
						class="dropdown-item" 
						class:active={option.value === selectedValue}
						onclick={() => handleOptionSelect(option.value)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.dropdown-label {
		color: var(--em-color);
		font-size: 14px;
		opacity: 0.8;
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-trigger {
		background: transparent;
		border: 1px solid var(--em-color);
		border-radius: 12px;
		padding: 6px 12px;
		color: var(--em-color);
		font-size: 14px;
		font-family: var(--font-stack);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.3s ease;
		justify-content: space-between;
	}

	.dropdown-trigger:hover {
		background-color: rgba(107, 141, 181, 0.1);
		border-color: var(--color);
	}

	.dropdown-arrow {
		font-size: 10px;
		transition: transform 0.3s ease;
		opacity: 0.7;
	}

	.dropdown-arrow.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: #f0f4f8;
		background-image: url("https://www.transparenttextures.com/patterns/billie-holiday.png");
		border: 1px solid rgba(74, 107, 133, 0.3);
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(74, 107, 133, 0.2);
		z-index: 10;
		margin-top: 4px;
		overflow: hidden;
	}

	.dropdown-item {
		width: 100%;
		background: transparent;
		border: none;
		padding: 8px 12px;
		color: var(--color);
		font-size: 14px;
		font-family: var(--font-stack);
		cursor: pointer;
		text-align: left;
		transition: background-color 0.2s ease;
	}

	.dropdown-item:hover {
		background-color: rgba(107, 141, 181, 0.15);
	}

	.dropdown-item.active {
		background-color: rgba(107, 141, 181, 0.2);
		color: var(--em-color);
		font-weight: 500;
	}
</style>
