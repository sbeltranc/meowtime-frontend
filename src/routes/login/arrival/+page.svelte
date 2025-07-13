<script>
    import { goto } from "$app/navigation";
    import { notify } from '$lib/components/notifications.js';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    import { user, api } from '$lib/stores/meowtime.js';

    $: currentUser = $user;

    let code = null;

    onMount(async () => {
        if (browser) {
            code = new URLSearchParams(window.location.search).get('code');
            
            if (!code) {
                notify.error('there was no authorization code given to the arrival', {
                    duration: 5000
                });
                return goto('/login');
            }

            try {
                const userData = await api.slackCallback(code);
                
                if (userData) {
                    user.set(currentUser);
                    notify.success(`successfully logged in with slack as ${currentUser.name.toLowerCase()}`, {
                        duration: 3000
                    });
                    goto('/dashboard');
                } else {
                    notify.error('failed to login with slack, try again later', {
                        duration: 5000
                    });
                    goto('/login');
                }
            } catch (err) {
                notify.error(`something went wrong while trying to login with slack, try again later`, {
                    duration: 5000
                });
                goto('/login');
            }
        }
    });
</script>

<main>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
    }

    .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #000;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>