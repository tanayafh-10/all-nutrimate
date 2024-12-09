# Gunakan Node.js sebagai base image
FROM node:18.18.0

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Ekspose port aplikasi
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]
