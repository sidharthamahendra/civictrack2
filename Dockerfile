# Step 1: Use an official lightweight web server image
FROM nginx:alpine

# Step 2: Copy website files into nginx directory
COPY . /usr/share/nginx/html

# Step 3: Expose port 80
EXPOSE 80

# Step 4: Start nginx
CMD ["nginx", "-g", "daemon off;"]
