#!/bin/bash
# for android js log
devTools=$HOME/AppData/Local/Android/Sdk/platform-tools
$devTools/adb.exe logcat | findstr com.androidjs.udl
