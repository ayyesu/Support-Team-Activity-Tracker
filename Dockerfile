FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    nodejs \
    npm \
    libpq-dev \
    nginx \
    gettext-base

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-install pdo_pgsql

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader
RUN npm install && npm run build

# Configure Nginx
COPY docker/nginx/conf.d/app.conf /etc/nginx/conf.d/default.template
RUN rm /etc/nginx/sites-enabled/default || true

# Create startup script
RUN echo '#!/bin/bash\nenvsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf\nnginx\nphp artisan migrate --force\nphp-fpm\ntail -f /dev/null' > /start.sh
RUN chmod +x /start.sh

# Expose port
EXPOSE $PORT

# Start Nginx and PHP-FPM
CMD ["/start.sh"]
