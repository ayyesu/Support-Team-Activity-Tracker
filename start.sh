#!/bin/bash
envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
# Start Nginx and PHP-FPM
nginx
php-fpm
tail -f /dev/null
