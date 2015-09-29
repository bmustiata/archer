# this file should be sourced, and not executed as a new script

CURRENT_FOLDER=`pwd`

function project() {
	CODE=`node $CURRENT_FOLDER/../lib/Project.js $@`
	eval $CODE
}

function server() {
	eval `node $CURRENT_FOLDER/../lib/Server.js $@`
}

function runtime() {
	eval `node $CURRENT_FOLDER/../lib/Runtime.js $@`
}

function projectcat() {
	node $CURRENT_FOLDER/../lib/Project.js $@
}

function servercat() {
	node $CURRENT_FOLDER/../lib/Server.js $@
}

function runtimecat() {
	node $CURRENT_FOLDER/../lib/Runtime.js $@
}
