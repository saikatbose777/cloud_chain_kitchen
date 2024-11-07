# Use a lightweight Debian-based image
FROM debian:bullseye-slim AS build

# Install necessary dependencies and CA certificates
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    libglu1-mesa \
    ca-certificates \
    --no-install-recommends && \
    apt-get clean && \
    update-ca-certificates

# Download Flutter SDK
RUN curl -LO https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.0.5-stable.tar.xz && \
    tar xf flutter_linux_3.0.5-stable.tar.xz && \
    mv flutter /usr/local/flutter

# Set PATH for Flutter and Dart SDK
ENV PATH="/usr/local/flutter/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Configure Git to trust the Flutter directory
RUN git config --global --add safe.directory /usr/local/flutter

# Set the working directory inside the container
WORKDIR /app

# Copy the Flutter project files to the container
COPY . /app

# Create a non-root user to run flutter commands
RUN useradd -ms /bin/bash flutteruser

# Change ownership of the project files to the non-root user
RUN chown -R flutteruser:flutteruser /app

# Switch to non-root user
USER flutteruser

# Run Flutter commands to configure and build the project
RUN flutter config --no-analytics && \
    flutter channel stable && \
    flutter upgrade && \
    flutter doctor && \
    flutter pub get && \
    flutter build web --release

# Switch back to root user to copy files
USER root

# Use an official nginx image to serve the built files
FROM nginx:alpine

# Copy built flutter web files to nginx server
COPY --from=build /app/build/web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
