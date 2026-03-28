FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

RUN cd /var/www/html/backend && composer install --no-dev --prefer-dist --no-interaction

EXPOSE 80

