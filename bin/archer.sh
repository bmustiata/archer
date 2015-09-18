# this file should be sourced, and not executed as a new script

function project() {
	eval $(archer-node-project $@)
}

function server() {
	eval $(archer-node-server $@)
}

function runtime() {
	eval $(archer-node-runtime $@)
}
