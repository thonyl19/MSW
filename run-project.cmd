@echo off
setlocal
:: =========================================
:: 啟動 VS2019 MVC 專案腳本 (Wrapper)
:: =========================================

set "REBUILD_ARG="
if /i "%~1"=="Rebuild" set "REBUILD_ARG=-Rebuild"
if /i "%~2"=="Rebuild" set "REBUILD_ARG=-Rebuild"

set "MODE_VAL=0"
for %%a in (%*) do (
    if /i "%%a"=="Mode=1" set "MODE_VAL=1"
    if "%%a"=="1" set "MODE_VAL=1"
)

:: 呼叫位元 .agent\scripts\ 下的主腳本
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0.agent\scripts\run-project.ps1" -Mode %MODE_VAL% %REBUILD_ARG%
endlocal
