# hamster-ui

Time tracker like hamster.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

```shell
docker build --build-arg OAUTH_CLIENT_ID=YOUR_CLIENT_ID --build-arg OAUTH_REDIRECT_URI=https://localhost:9000/ . -t hamster-ui
```

```shell
mkdir ssl
sudo openssl genpkey -algorithm RSA -out ./ssl/localhost.key -aes256

# Generate a certificate signing request (CSR)
sudo openssl req -new -key ./ssl/localhost.key -out ./ssl/localhost.csr

# Generate a self-signed certificate using the CSR and private key
sudo openssl x509 -req -days 365 -in ./ssl/localhost.csr -signkey ./ssl/localhost.key -out ./ssl/localhost.crt

echo "YOUR_PASSWORD" > ./ssl/nginx.pass
```
