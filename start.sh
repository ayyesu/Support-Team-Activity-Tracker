#!/bin/bash
export PORT=${PORT:-80}
envsubst '$PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
# Start Nginx and PHP-FPM
nginx
php artisan config:cache
php artisan migrate:fresh --force --seed
php-fpm
tail -f /dev/null
