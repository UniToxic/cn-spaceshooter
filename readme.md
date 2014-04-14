## Project Demo 

[cn-spaceshooter demo page](http://unitoxic.github.io/cn-spaceshooter/)

Might not be inline with master

## Project Setup

### Pre-requisites

The main requirement is nodejs and npm (node package manager), installing these will allow the dependency management to be automated.

[Nodejs](http://nodejs.org/)

Using npm install bower which will allow for automatic installation of the frontend dependencies.
```
npm install -g bower
```

### Setup Instructions

To install all the dependencies run the grunt cli, npm and bower installers.
```
npm install -g grunt-cli
npm install
bower install
```

### Development Instructions

To create the dist folder and all its contents run the build command.
```
grunt build-dev
```

Start the watcher which will listen for file changes and automatically concat css and js files and move the to the dist folder.
```
grunt dev
```

To push the current build version to github pages
```
grunt page
```

This will clone a local repo and push all files in dist to the gh-pages branch
It can take upto 15 minutes for github to update the changes.
