<script>
    import { goto } from "$app/navigation";
	import { notify } from '$lib/components/notifications.js';

    let email = '';
	let isLoading = false;

	async function handleEmailLogin() {
		if (!email) return;

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			notify.error('please enter a valid email address silly', { dismissible: true });
			return;
		}

		isLoading = true;
		setTimeout(() => {
			isLoading = false;
			notify.success(`we have sent a login link to ur mail, plz check ur inbox!`, { dismissible: true });
		}, 1500);
	}

	function handleSlackLogin() {
		goto(`https://${process.env.SAPI_BASE_URL}/auth-service/slack/login`);
	}
</script>

<div id="login_card">
	<h1 id="login_title">hello!!</h1>
	<p id="login_subtitle">choose your preferred login method</p>
	
	<div id="login_form">
		<div id="email_section">
			<label for="email">email address</label>
			<input 
				type="email" 
				id="email" 
				bind:value={email} 
				placeholder="your@email.com"
			/>
			<button 
				id="email_btn" 
				on:click={handleEmailLogin}
				disabled={!email || isLoading}
			>
				{isLoading ? 'sending...' : 'send login link'}
			</button>
		</div>

		<div id="login_divider">
			<span>or</span>
		</div>

		<button id="slack_btn" on:click={handleSlackLogin}>
			<svg id="slack_icon" viewBox="0 0 24 24" fill="currentColor">
				<path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
			</svg>
			continue with slack
		</button>
	</div>
</div>

