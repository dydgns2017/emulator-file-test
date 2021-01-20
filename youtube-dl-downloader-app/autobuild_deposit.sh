#!/bin/bash

# set variable
devFolder=$(pwd)
emuFolder=$HOME/AppData/Local/Android/Sdk/emulator/
devTools=$HOME/AppData/Local/Android/Sdk/platform-tools/

## emualtor execute
# change here if you want to use a different emulator
cd $emuFolder 
nohup ./emulator.exe -avd Nexus_7_2012_API_30 -dns-server 8.8.8.8 &

## androidjs build
cd $devFolder
androidjs build --force --release

## deposit
cd $devTools
./adb.exe -e install $devFolder/dist/youtube-dl-downloader-app.apk