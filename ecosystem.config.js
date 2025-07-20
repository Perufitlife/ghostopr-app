module.exports = {
  apps: [{
    name: 'ghostopr-app',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    
    // Memory management for 1GB server
    max_memory_restart: '400MB',
    node_args: '--max-old-space-size=512',
    
    // Environment
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    
    // Monitoring
    log_file: './logs/app.log',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    
    // Auto restart
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    
    // Performance
    min_uptime: '5s',
    max_restarts: 5,
    
    // Memory monitoring
    autorestart: true,
    restart_delay: 1000
  }]
} 