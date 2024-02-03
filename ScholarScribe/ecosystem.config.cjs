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
				PORT: 5173 // port the app will be launched on
			},
            env:{
                PORT: 5173, // port the app will be launched on
                ORIGIN: 'http://ramen.valpo.edu'
            },
            watch: true,
            ignore_watch: ['node_modules'],
		}
	]
};