@echo off
:: 使用 PowerShell 請求管理員權限並重新執行此批次檔，且進入目前目錄執行 npm run setup
powershell -Command "Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd ''%cd%''; npm run setup' -Verb RunAs"
