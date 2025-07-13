<script>
    import { goto } from "$app/navigation";
</script>

<nav id="navbar">
	<div id="navbar-container">
		<a href="/" id="logo">meowtime</a>
		<div id="nav-separator"></div>
		<a href="/leaderboard" id="nav-leaderboard">Leaderboard</a>
		<div id="nav-separator"></div>

		<button id="nav-login-btn" onclick={() => goto("/login")}>Login</button>
	</div>
</nav>

<svelte:head>
	<title>meowtime</title>
	<meta
		name="description"
		content="an utility for gaining insights into the development of your projects"
	/>
</svelte:head>
