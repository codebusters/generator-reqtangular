# This is a server for working with the authModule of reqtangular

Apparently need to specify cross origin on server:

XMLHttpRequest cannot load http://127.0.0.1:8888/login.
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:9001' is therefore not allowed access.
The response had HTTP status code 405.


http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
http://scotch.io/tutorials/javascript/upgrading-our-easy-node-authentication-series-to-expressjs-4-0

# run
node server.js

# to login with facebook as per https://scotch.io/tutorials/easy-node-authentication-facebook
# you need to create an fb application.

# google app
https://console.developers.google.com/project/rq-backend/apiui/credential?clientType

// TODO add tests
// TODO add json restful api
// TODO generate yeoman generator for this
