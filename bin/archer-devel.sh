# this file should be sourced, and not executed as a new script

CURRENT_FOLDER=`pwd`

function project() {
	eval $(node $CURRENT_FOLDER/../lib/Project.js $@)
}

function server() {
	eval $(node $CURRENT_FOLDER/../lib/Server.js $@)
}

function runtime() {
	eval $(node $CURRENT_FOLDER/../lib/Runtime.js $@)
}
