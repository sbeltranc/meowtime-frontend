<script>
    import { goto } from "$app/navigation";
	import { user, isLoggedIn, api } from '$lib/stores/meowtime.js';

	$: currentUser = $user;
	$: loggedIn = $isLoggedIn;
	
	let dropdownOpen = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	async function handleLogout() {
		try {
			await api.logout();
			closeDropdown();
			goto('/login');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.profile-dropdown')) {
			closeDropdown();
		}
	}
</script>

<nav id="navbar" on:click={handleClickOutside}>
	<div id="navbar-container">
		<a href="/" id="logo">meowtime</a>
		<div id="nav-separator"></div>
		<a href="/leaderboard" id="nav-leaderboard">Leaderboard</a>
		<div id="nav-separator"></div>

		{#if loggedIn}
			<!-- Profile dropdown -->
			<div class="profile-dropdown">
				<button 
					class="profile-button"
					on:click|stopPropagation={toggleDropdown}
					aria-label="Profile menu"
				>
					{#if currentUser?.picture}
						<img 
							src={currentUser.picture} 
							alt="{currentUser.name}'s profile"
							class="profile-image"
						/>
					{:else}
						<div class="profile-placeholder">
							{currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
						</div>
					{/if}
				</button>
				
				{#if dropdownOpen}
					<div class="dropdown-menu">
						<div class="dropdown-header">
							<div class="user-info">
								<div class="user-name">{currentUser?.name || 'User'}</div>
								<div class="user-email">{currentUser?.email || ''}</div>
							</div>
						</div>
						<div class="dropdown-divider"></div>
						<a href="/dashboard" class="dropdown-item" on:click={closeDropdown}>
							<span class="dropdown-icon">📊</span>
							Dashboard
						</a>
						<button class="dropdown-item logout-item" on:click={handleLogout}>
							<span class="dropdown-icon">🚪</span>
							Logout
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<button id="nav-login-btn" on:click={() => goto("/login")}>Login</button>
		{/if}
	</div>
</nav>

<svelte:head>
	<title>meowtime</title>
	<meta
		name="description"
		content="an utility for gaining insights into the development of your projects"
	/>
</svelte:head>

<style>
	.profile-dropdown {
		position: relative;
		display: inline-block;
	}

	.profile-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.2s ease;
	}

	.profile-button:hover {
		transform: scale(1.05);
	}

	.profile-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid #4a6b8540;
		box-shadow: 0 2px 8px rgba(74, 107, 133, 0.1);
	}

	.profile-placeholder {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--em-color) 0%, var(--color) 100%);
		color: #f0f4f8;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 16px;
		border: 2px solid #4a6b8540;
		box-shadow: 0 2px 8px rgba(74, 107, 133, 0.1);
		font-family: var(--font-stack);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 8px;
		background-color: #f0f4f8;
		background-image: url("https://www.transparenttextures.com/patterns/billie-holiday.png");
		border: 2px solid #4a6b8540;
		border-radius: 20px;
		box-shadow: 0 4px 20px rgba(74, 107, 133, 0.15);
		backdrop-filter: blur(10px);
		min-width: 220px;
		z-index: 1000;
		overflow: hidden;
		animation: dropdown-appear 0.15s ease-out;
	}

	@keyframes dropdown-appear {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-header {
		padding: 16px 20px 12px 20px;
		background: rgba(107, 141, 181, 0.08);
		border-bottom: 1px solid #4a6b8540;
	}

	.user-info {
		text-align: left;
	}

	.user-name {
		font-weight: 600;
		color: var(--color);
		font-size: 15px;
		margin-bottom: 4px;
		font-family: var(--font-stack);
	}

	.user-email {
		color: var(--em-color);
		font-size: 13px;
		font-family: var(--font-stack);
	}

	.dropdown-divider {
		height: 1px;
		background: #4a6b8540;
		margin: 8px 0;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		padding: 12px 20px;
		text-decoration: none;
		color: var(--color);
		font-size: 14px;
		background: none;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: var(--font-stack);
		font-weight: 500;
	}

	.dropdown-item:hover {
		background-color: rgba(107, 141, 181, 0.1);
		color: var(--em-color);
	}

	.logout-item:hover {
		background-color: rgba(220, 38, 38, 0.08);
		color: #dc2626;
	}

	.dropdown-icon {
		margin-right: 10px;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
	}
</style>
