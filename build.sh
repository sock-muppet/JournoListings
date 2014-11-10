#!/bin/bash

rm -rf firefox/data/lib/
rm -rf chrome/src/lib/

cp -R src/* bin/firefox/data
cp -R src/* bin/chrome/src