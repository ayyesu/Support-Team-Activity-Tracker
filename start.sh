#!/bin/bash
export PORT=${PORT:-80}
envsubst '$PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf

# Clear configuration cache
php artisan config:clear
php artisan cache:clear

# Start Nginx
nginx

# Run migrations with fresh state
php artisan migrate:fresh --force --seed

# Start PHP-FPM
php-fpm

# Keep container running
tail -f /dev/null
