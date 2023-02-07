# Productivity.Idle

This is a gamified productivity tracker built into a chrome extension. You collect "typed characters" as you type on your keyboard to use as currency to by upgrades to earn "typed characters" even faster!

# Build

**Productivity.Idle** chrome extension is built in:
- HTML
- CSS
- JavaScript

## Features and Usage

**Productivity.Idle** runs in the background as you do work using Google Chrome.

You can collect "characters" as you type in which ever tab you are currently using as long as Google Chrome is in focus (actively used and not just opened in the background).

By clicking on the chrome extension icon of **Productivity.Idle**, you are presented with an UI view of the extension in a small window. There you will find two buttons located on the top that will bring you to the Upgrades page or the Stats page.

You can click on the chrome extension icon of **Productivity.Idle** to view an UI of the tracker and your current progress, buy upgrades and have a look at your overall stats.

 - Main page
	 - A quick view on your current progress.
	 - Current Title
	 - Current Level, Experience Bar, Characters Accumulated
	 - A visual display on your inputs.
	 - Current multiplier per input
	 - Two buttons to take you to the Upgrade Page and Stats Page.

- Upgrade Page
	- Three available upgrades that you can buy by using your accumulated characters.
- Stats Page (Overall statistics)
	- Total characters accumulated
	- Usable characters left
	- Total upgrades bought
	- Current multiplier per input

# Project Components & Installation
## Project components

This project is comprised of four components. 

In order to run this project locally on your personal computer, you will only need two of the four. 

You can use the other two optional repositories to play with the code and make changes in regular JavaScript. If you are able to navigate through minified JavaScript then you do not need the optional repositories.

Please follow respective installation process for each repository.

Required
- [Productivity.Idle](https://github.com/Gachuka/productivity.idle)
- [Productivity.Idle-api](https://github.com/Gachuka/productivity.idle-api)

Optional
- [Productivity.Idle-popup](https://github.com/Gachuka/productivity.idle-popup)
- [Productivity.Idle-content-script](https://github.com/Gachuka/productivity.idle-content-script)

## Installation

 1. Download the ZIP file from the main branch and extract it.
 2. Navigate to your [Chrome Extensions](chrome://extensions/) and make sure to toggle on Developer Mode on the top right of the page.
 3. Three buttons should appear on the top left under the title **Extensions**.
 4. Click on *Load unpacked* and dialogue should appear to selected the extracted folder. (Make sure to select the folder that contains the extension or you will get a *Failed to load extension* error)
 5. Once that is done, you are ready to go. For the extension to mount and work properly, make sure to reload the tab you want to work on if the tab was already open before installing the extension.
 6. The extension should mount and work upon opening a new tab after installation.

# API

**Productivity.Idle** uses a remote API that is created with [Productivity.Idle-api](https://github.com/Gachuka/productivity.idle-api) mentioned above to store the progress data.

You can choose to use a local database or the preset remote database, you can make the changes needed with [Productivity.Idle-popup](https://github.com/Gachuka/productivity.idle-popup) and [Productivity.Idle-content-script](https://github.com/Gachuka/productivity.idle-content-script).
Please read the ***Using Local/Remote Database***section in the installation guide in their respective repositories for instructions.

# Lessons Learned
Building a chrome extension really showed me how doing proper research and properly reading and understanding my findings saves a lot of time.

Before using Webpack to compile JavaScript for content-script, I wrote the logics needed to do API requests in vanilla JavaScript. I have only been using Axios so more research was needed.

I've realized that a lot of the information that I need I have already found in the beginning, but I just did not understand fully what the solution was. 

Reading and understanding what is written is very important.

Another thing is that when things get too confusing, it is ok to completely rewrite the code. Since the brainstorming process has already been done, I can focus on the logics and write cleaner code.

# Next Steps

For the chrome extension: 

- Adding a prestige system to progress even further at a faster pace.

- Figure out a way to communicate "logged in" status to the background listener and also knowing which user is logged in to GET and PUT to the correct user in the backend.

Moving forward from this point: 

- I was able to learn and figure out how to build something in a new environment such as a game in a chrome extension. For my next step, I want to remake Productivity.Idle as a standalone app.

- Maybe using something like [Electron](https://www.electronjs.org/), [Tauri](https://tauri.app/) or [Neutralinojs](https://neutralino.js.org/) would be my next goal.
