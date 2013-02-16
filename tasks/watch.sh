#!/bin/sh
while inotifywait -e modify -q -r ./app/web; do
    echo `date +%s` > ./app/web/debug-version.txt
done