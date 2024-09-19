
## Using Docker

1. Build your NextJS:
`cd /home/blueoc/`
`npx create-next-app@latest`
`What is your project named? task3`
`cd /home/blueoc/task3`
2. Create Dockerfile and .dockerignore files and copy the content of those two files as in the project
3. Modify `next.config.js`
```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
```
4. Build your container: `docker build -t task3 .`
5. Run your container: `docker run -p 3000:3000 task3`

## Running Locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Support SSL
`sudo nano /etc/hosts`

127.0.0.1   blueoc-entrance-test.com
#
`cd /home/blueoc/task3`

`mkcert  blueoc-entrance-test.com`

#
`sudo nano /etc/nginx/sites-available/blueoc-entrance-test.com`

server{

    listen 80;
    server_name blueoc-entrance-test.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {

    listen 443 ssl;
    server_name blueoc-entrance-test.com;

    ssl_certificate /home/blueoc/task3/blueoc-entrance-test.com.pem;
    ssl_certificate_key /home/blueoc/task3/blueoc-entrance-test.com-key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:3000/;
        proxy_redirect off;
    }
}

`sudo ln -s /etc/nginx/sites-available/blueoc-entrance-test.com  /etc/nginx/sites-enabled/blueoc-entrance-test.com`

`sudo nginx -t`

`sudo nginx -s reload`

#
On browser access domain blueoc-entrance-test.com

![](https://i.imgur.com/3vdbc7b.png)

=> Done
