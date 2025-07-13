<script>
	import NotificationContainer from '$lib/components/NotificationContainer.svelte';
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />
	<NotificationContainer />

	<main>
		{@render children()}
	</main>
	
	<div id="footer-container">
		<p id="footer">
			made with ❤️ for
			<a href="https://hackclub.com/" target="_blank">hackers,</a> by a <a href="https://github.com/sbeltranc/" target="_blank">hacker</a>
		</p>
		<div id="footer-links">
			<a href="/privacy">Privacy</a>
			<p>•</p>
			<a href="/terms">Terms</a>
		</div>
	</div>
</div>
