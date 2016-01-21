# td.js

Is a line console to starting the application. And this have support with Babel that allow write own app. For example with ES6, React, ES7.


## Install

This project use a [NPM](https://www.npmjs.com/) ([Node][NodeJS] Package Manager) to install it. With:

```
npm install -g td.js
```

## How use

this provides the `td` command, that permit the control to projects in running the `bootstrap/register.js` file with [Node][NodeJS].


### `td help`

show help.

```
Usage: td [options] COMMAND

Version: 0.2.0

Options:
	--script, -s     Configure script file to running.
	--help, -h       Show help.
	--version, -v    Print the version.

Commands:
	live, l          Run the application.
	watch, w         Run the application, restarting after any change.
	test, t          Run application tests.
	help, h          Show help.
```


### `td live`

Run the application.

```log
[td] 0.2.0
[td] starting `bootstrap/register.js`
...
```



### `td watch`

Run the application, restarting after any change.

```log
[td] 0.2.0
[td] to restart at any time, enter `rs`
[td] watching: *.*
[td] starting `bootstrap/register.js`
...
```



### `td test`

Run application tests. Reading all files into `spec/*Spec.js` files.


[NodeJS]: https://nodejs.org/
