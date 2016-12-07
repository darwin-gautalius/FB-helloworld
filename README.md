# Prerequisites
- Facebook Account
- Node JS

# Preparation
1. Login to [Facebook](https://www.facebook.com) (skip this step if you are logged in)
2. Create a developer account: go to [Developer Account](https://developers.facebook.com/docs/apps/register#developer-account)
  - Click “Create Developer Account”
  - Accept Facebook Platform & Privacy Policy
  - Click “Register”
3. Create a new App ID: go to [Quick Start for Website](https://developers.facebook.com/quickstarts/?platform=web)
  - Type name of your new app
  - Click “Create New Facebook App ID”
  - Type Display Name for the app
  - Type Contact Email for the app
  - Choose Category for the app
  - Click “Create App ID”
4. Setup the new App ID: (continue from step no 3)
  - Setup SDK: copy only the provided `appId` and continue scrolling down to the next step
  - App Configuration:
    - Input Site URL: for this demo, input `http://localhost:8888`
    - Click Next
  - Test your Facebook Integration: skip this step and continue scrolling
  - Scroll down until you find the “Finished!”

# Writing The Code
- Create a folder called “Hello World”
- Create a file called “index.html” and paste this code:

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- create a button to let people say `Hello World!` -->
    <button onclick="post()">Say "Hello World!"</button>
    <script>
      // prepare a callback hook, will be called by FB SDK
      window.fbAsyncInit = function() {
        // initialize FB app
        FB.init({
          appId      : '<APP_ID>', // your newly created App ID
          xfbml      : true,
          version    : 'v2.8'
        });
      };

      // create a function to login the current user & post "Hello World!" to his timeline
      function post() {
        // login the current user
        FB.login(response => {
          // for demo purpose, assume login is always success

          // post "Hello World!"
          FB.api('/me/feed', 'POST', { message: 'Hello World!' }, (response) => {
            let answer = confirm('We posted "Hello World!" to your timeline. Do you want to see it?');

            // open the link
            if (answer) {
              window.open('https://www.facebook.com/' + response.id);
            }
          });

        }, { scope: 'publish_actions', return_scopes: true });
      }
    </script>
    <script src="//connect.facebook.net/en_US/sdk.js"></script>
  </body>
</html>
```

- Create a file called `server.js` and paste this code:

```javascript
// load libraries needed
let http = require('http');
let fs = require('fs');

// Create a server
let server = http.createServer((request, response) => {
  // load index.html
  let index = fs.readFileSync('index.html');

  // for demo purpose only, always return "index.html" to the browser
  response.end(index);
});

// start the server with port 8888
server.listen(8888);
```

- open command line, and `cd` to this folder
- run command `node server.js`
- Open the browser, and type: [“http://localhost:8888”](http://localhost:8888)
