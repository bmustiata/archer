# this file should be sourced, and not executed as a new script

CURRENT_FOLDER=`pwd`

function project() {
	CODE=$(node $CURRENT_FOLDER/../lib/Project.js --internalRunMode=project $@)
	eval $CODE
}

function server() {
	CODE=$(node $CURRENT_FOLDER/../lib/Project.js --internalRunMode=server $@)
	eval $CODE
}

function projectcat() {
	node $CURRENT_FOLDER/../lib/Project.js --internalRunMode=project $@
}

function servercat() {
    node $CURRENT_FOLDER/../lib/Project.js --internalRunMode=server $@
}

