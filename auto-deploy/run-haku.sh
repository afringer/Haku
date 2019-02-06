#!/bin/bash

if [ ! -e "config.sh" ]; then
	echo "Missing config file: config.sh"
	exit 1
fi
source config.sh

echo "Checking if required files exists"
files="${required_source_files} ${required_binary_files}"

for file in $files; do
    if [ ! -e $file ]; then
        echo "Unable to find file ${file}"
        exit 1
    fi
done;

if [ -e haku.pid ]; then
    pid=$(cat haku.pid)
    echo "Killing old process: ${pid}"
    while ps -p $pid; do
        kill $pid
        sleep 2
    done
fi

echo "Attempting to start Haku Bot"
npm ci
nohup npm start >> haku.log &
echo $! > haku.pid

exit 0
