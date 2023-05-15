@echo off
cd /d %~dp0
del /Q channel_v3.json
aria2c -o channel_v3.json https://packagecontrol.io/channel_v3.json
pause

