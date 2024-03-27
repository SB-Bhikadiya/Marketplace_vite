# Use official Nginx image as base
FROM nginx:alpine

# Copy the built dist directory into the Nginx server directory
COPY dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
