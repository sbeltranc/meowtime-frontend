<script>
	import { goto } from '$app/navigation';
	import { Chart } from '@flowbite-svelte-plugins/chart';
		
    import { notify } from '$lib/components/notifications.js';
    import { user, isLoggedIn } from '$lib/stores/meowtime.js';

	$: currentUser = $user;
	$: loggedIn = $isLoggedIn;

	let lineChartOptions = {
		chart: {
			type: /** @type {'line'} */ ('line'),
			height: 300,
			background: 'transparent',
			toolbar: {
				show: false
			}
		},
		colors: ['#6b8db5', '#4a6b85'],
		stroke: {
			curve: /** @type {'smooth'} */ ('smooth'),
			width: 3
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'vertical',
				shadeIntensity: 0.1,
				gradientToColors: ['rgba(107, 141, 181, 0.1)', 'rgba(74, 107, 133, 0.1)'],
				opacityFrom: 0.8,
				opacityTo: 0.1
			}
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			labels: {
				style: {
					colors: '#4a6b85'
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: '#4a6b85'
				}
			}
		},
		legend: {
			labels: {
				colors: '#4a6b85'
			}
		},
		grid: {
			borderColor: 'rgba(74, 107, 133, 0.1)'
		},
		series: [
			{
				name: 'Active Users',
				data: [120, 190, 300, 500, 200, 300]
			},
			{
				name: 'New Signups',
				data: [80, 120, 150, 220, 180, 250]
			}
		]
	};

	let doughnutChartOptions = {
		chart: {
			type: /** @type {'donut'} */ ('donut'),
			height: 300,
			background: 'transparent'
		},
		colors: ['#6b8db5', '#4a6b85', '#7ba3d0'],
		labels: ['VS Code', 'Terminal', 'Browser'],
		legend: {
			position: /** @type {'bottom'} */ ('bottom'),
			labels: {
				colors: '#4a6b85'
			}
		},
		plotOptions: {
			pie: {
				donut: {
					size: '70%'
				}
			}
		},
		series: [65, 30, 5]
	};

	let radarChartOptions = {
		chart: {
			type: /** @type {'radar'} */ ('radar'),
			height: 300,
			background: 'transparent'
		},
		colors: ['#6b8db5'],
		fill: {
			opacity: 0.2
		},
		stroke: {
			width: 2
		},
		markers: {
			size: 4
		},
		xaxis: {
			categories: ['Coding', 'Planning', 'Designing', 'Testing', 'Debugging', 'Learning'],
			labels: {
				style: {
					colors: '#4a6b85'
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: '#4a6b85'
				}
			}
		},
		series: [
			{
				name: 'Activity Hours',
				data: [85, 65, 45, 70, 60, 55]
			}
		]
	};

	// Stats data
	let stats = [
		{ title: 'Total Time Spent', value: '127h 42m', change: '+18%', trend: 'up' },
		{ title: 'Lines of Code Written', value: '15,234', change: '+23%', trend: 'up' },
		{ title: 'Projects Worked', value: '8', change: '+2', trend: 'up' }
	];

	// Checking if the user is logged in (lol)
	if (!isLoggedIn) {
		notify.info('you must be logged in to access the dashboard', {
			duration: 5000
		});
		goto("/login");
	}
</script>

<svelte:head>
	<title>meowtime - dashboard</title>
</svelte:head>

<div class="dashboard-container">
	<div class="dashboard-header">
		<h1>Dashboard</h1>
		<p class="dashboard-subtitle">
			Welcome back! Here's what's happening with your data.
		</p>
	</div>

	<!-- Stats Grid -->
	<div class="stats-grid">
		{#each stats as stat}
			<div class="stat-card">
				<div class="stat-header">
					<h3 class="stat-title">{stat.title}</h3>
					<span class="stat-change {stat.trend}">
						{stat.change}
						{#if stat.trend === 'up'}
							<svg class="trend-icon" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
							</svg>
						{:else}
							<svg class="trend-icon" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
						{/if}
					</span>
				</div>
				<div class="stat-value">{stat.value}</div>
			</div>
		{/each}
	</div>

	<!-- Charts Grid -->
	<div class="charts-grid">
		<!-- Line Chart -->
		<div class="chart-card large">
			<div class="chart-header">
				<h3>User Growth Over Time</h3>
				<p>Monthly active users and new signups</p>
			</div>
			<div class="chart-container">
				<Chart options={lineChartOptions} />
			</div>
		</div>

		<!-- Doughnut Chart -->
		<div class="chart-card">
			<div class="chart-header">
				<h3>Software Usage</h3>
				<p>Time distribution by the tools you use for your projects</p>
			</div>
			<div class="chart-container">
				<Chart options={doughnutChartOptions} />
			</div>
		</div>

		<!-- Radar Chart -->
		<div class="chart-card">
			<div class="chart-header">
				<h3>Activity Metrics</h3>
				<p>Time distribution across activities done regarding your projects</p>
			</div>
			<div class="chart-container">
				<Chart options={radarChartOptions} />
			</div>
		</div>
	</div>

	<!-- Recent Activity Section -->
	<div class="activity-section">
		<div class="activity-header">
			<h3>Recent Activity</h3>
			<button class="view-all-button" on:click={() => console.log('View all activity')}>View All</button>
		</div>
		<div class="activity-list">
			<div class="activity-item">
				<div class="activity-dot"></div>
				<div class="activity-content">
					<p class="activity-text">New user registered: john@example.com</p>
					<span class="activity-time">2 minutes ago</span>
				</div>
			</div>
			<div class="activity-item">
				<div class="activity-dot"></div>
				<div class="activity-content">
					<p class="activity-text">Task "Update dashboard" completed</p>
					<span class="activity-time">15 minutes ago</span>
				</div>
			</div>
			<div class="activity-item">
				<div class="activity-dot"></div>
				<div class="activity-content">
					<p class="activity-text">System backup completed successfully</p>
					<span class="activity-time">1 hour ago</span>
				</div>
			</div>
			<div class="activity-item">
				<div class="activity-dot"></div>
				<div class="activity-content">
					<p class="activity-text">Database optimization finished</p>
					<span class="activity-time">3 hours ago</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px 0 20px;
		width: 100%;
	}

	.dashboard-header {
		margin-bottom: 32px;
		text-align: left;
	}

	.dashboard-header h1 {
		font-size: 32px;
		color: var(--color);
		margin-bottom: 8px;
		font-weight: 600;
	}

	.dashboard-subtitle {
		color: var(--em-color);
		font-size: 16px;
		opacity: 0.8;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-bottom: 32px;
	}

	.stat-card {
		background-color: rgba(107, 141, 181, 0.08);
		border: 1px solid rgba(74, 107, 133, 0.2);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 12px rgba(74, 107, 133, 0.1);
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(74, 107, 133, 0.15);
		background-color: rgba(107, 141, 181, 0.12);
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.stat-title {
		font-size: 14px;
		color: var(--em-color);
		font-weight: 500;
		margin: 0;
	}

	.stat-change {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 600;
	}

	.stat-change.up {
		color: #22c55e;
	}

	.stat-change.down {
		color: #ef4444;
	}

	.trend-icon {
		width: 12px;
		height: 12px;
	}

	.stat-value {
		font-size: 28px;
		font-weight: 700;
		color: var(--color);
	}

	.charts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 24px;
		margin-bottom: 32px;
	}

	.chart-card {
		background-color: rgba(107, 141, 181, 0.05);
		border: 1px solid rgba(74, 107, 133, 0.15);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 12px rgba(74, 107, 133, 0.08);
	}

	.chart-card.large {
		grid-column: span 2;
	}

	.chart-header {
		margin-bottom: 20px;
	}

	.chart-header h3 {
		font-size: 18px;
		color: var(--color);
		margin: 0 0 4px 0;
		font-weight: 600;
	}

	.chart-header p {
		font-size: 14px;
		color: var(--em-color);
		opacity: 0.7;
		margin: 0;
	}

	.chart-container {
		height: 300px;
		position: relative;
	}

	.activity-section {
		background-color: rgba(107, 141, 181, 0.05);
		border: 1px solid rgba(74, 107, 133, 0.15);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 4px 12px rgba(74, 107, 133, 0.08);
	}

	.activity-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.activity-header h3 {
		font-size: 18px;
		color: var(--color);
		margin: 0;
		font-weight: 600;
	}

	.view-all-button {
		color: var(--em-color);
		background: none;
		border: none;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		padding: 0;
		text-decoration: none;
	}

	.view-all-button:hover {
		color: #7ba3d0;
		text-decoration: underline;
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.activity-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 12px 0;
	}

	.activity-dot {
		width: 8px;
		height: 8px;
		background-color: var(--em-color);
		border-radius: 50%;
		margin-top: 6px;
		flex-shrink: 0;
	}

	.activity-content {
		flex: 1;
	}

	.activity-text {
		color: var(--color);
		font-size: 14px;
		margin: 0 0 4px 0;
	}

	.activity-time {
		color: var(--em-color);
		font-size: 12px;
		opacity: 0.7;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.chart-card.large {
			grid-column: span 1;
		}
		
		.charts-grid {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.dashboard-container {
			padding: 32px 16px 0 16px;
		}
		
		.stats-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 16px;
		}
		
		.charts-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		
		.stat-card {
			padding: 20px;
		}
		
		.chart-card {
			padding: 20px;
		}
		
		.chart-container {
			height: 250px;
		}
		
		.dashboard-header h1 {
			font-size: 28px;
		}
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
		
		.dashboard-container {
			padding: 24px 16px 0 16px;
		}
		
		.stat-card {
			padding: 16px;
		}
		
		.chart-card {
			padding: 16px;
		}
		
		.activity-section {
			padding: 16px;
		}
	}
</style>