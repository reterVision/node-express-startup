#! /bin/bash

WORKING_DIR=$1

if [ ! -d "$WORKING_DIR" ]; then
    # Create a directory
    echo "Creating $WORKING_DIR"
    mkdir $WORKING_DIR
fi

if [[ -d $WORKING_DIR ]]; then
    # Cloing express start-up project to specified directory
    cd $WORKING_DIR
    git clone git://github.com/reterVision/node-express-startup.git

    # Open startup project
    cd node-express-startup
    # Install the node packages
    npm install
    # Remove .git folder
    rm -rf .git
else
    echo "$WORKING_DIR is not valid"
    exit 1
fi
