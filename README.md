# electron-quick-start

Electron app with electron-builder auto updating.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```
Generate a GitHub access token by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Once you have the token, assign it to an environment variable

On macOS/linux:

 export GH_TOKEN="<YOUR_TOKEN_HERE>"
On Windows, run in powershell:

 [Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")
Make sure to restart IDE/Terminal to inherit latest env variable.

create electron-builder.yml and add this file to .gitignore
    appId: myapp32
    publish:
        provider: github
        token: <githubtoken>


## Resources for Learning Electron


## License

[CC0 1.0 (Public Domain)](LICENSE.md)
