<script>
    import { goto } from "$app/navigation";
	import { user, isLoggedIn } from '$lib/stores/meowtime.js';

	$: currentUser = $user;
	$: loggedIn = $isLoggedIn;
</script>

<nav id="navbar">
	<div id="navbar-container">
		<a href="/" id="logo">meowtime</a>
		<div id="nav-separator"></div>
		<a href="/leaderboard" id="nav-leaderboard">Leaderboard</a>
		<div id="nav-separator"></div>

		{#if loggedIn}
			<a href="/dashboard" id="nav-dashboard">Dashboard</a>
			<div id="nav-separator"></div>
			<button id="nav-logout-btn" onclick={() => {
				currentUser.logout();
				goto('/login');
			}}>Logout</button>
		{:else}
			<button id="nav-login-btn" onclick={() => goto("/login")}>Login</button>
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
