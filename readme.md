## Project Setup

### Pre-requisites

The main requirement is nodejs and npm (node package manager), installing these will allow the dependency management to be automated.

[Nodejs](http://nodejs.org/)

Using npm install bower which will allow for automatic installation of the frontend dependencies.
```
npm install -g bower
```

### Setup Instructions

To install all the dependencies run the npm and bower installers.
```
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
