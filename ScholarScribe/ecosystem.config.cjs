module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		// First application
		{
			name: 'ScholarScribe', // name of the process in PM2
			script: '/home/scholarscribe/Documents/GitHub/Svelte-Citation/ScholarScribe/build/index.js',
			env_production: {
				NODE_ENV: 'production',
				PORT: 5173, // port the app will be launched on
				ORIGIN: 'https://ramen.valpo.edu',
			},
            env:{
                PORT: 5173, // port the app will be launched on
                ORIGIN: 'https://ramen.valpo.edu',
            },
			watch: ["prisma", "src"],
			// Delay between restart
			watch_delay: 10000,
			ignore_watch : ["node_modules", "client/img", "\\.git", "*.log"],
		}
	]
};