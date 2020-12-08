# Electron

This repo has the code for some of the electron projects I am learning.

Electron is a framework for the development of desktop applications using web technologies .

* In Electron , there is only one main process which runs package.jsons script and it can display a GUI by creating web pages . For all other processes / renderers , they need to   call it through the main script  using IPC 
* Printing debug( console.log ) statement in main.js doesnt output in browser as the application considers it to be server side process , this gets outputted in terminal window 
  similar to node js
* Similarly we cannot user document in main.js because the application considers to be a server side process
* If any system call ( System API) need to be made, we can do that through main process / main.js and not through render process and the communication between these two can be
  handled using IPC

### IPC

1. There are two components in IPC
   * Main process
   * Renderer

Examples as given below

* IPC Main : This is to be used in the main process for listening to the incoming requests . Example code as below
  > const ipcMain = require('electron') <br />
    ipcMain.on('listeningtoEvent',(event,args) =>{ <br />
       console.log("received data is "+args); <br />
       // we can perform some operation and return the data as below <br />
       event.returnValue = someData <br />
    }) <br />
    // the above is for synchronous calls <br />
    // For asynchronous we can do as below  <br />
    ipcMain.on('listeningtoAsynchronousEvent',(event,args) =>{ <br />
       console.log("received data is "+args); <br />
       // we can perform some operation and return the data as below <br />
       event.reply('asynchronous-reply*',someData);  // * means that renderer should also be listening on the same event for asynchronous calls <br />
    }) <br />
* IPC Renderer : This is to be used in the render process for calling / sending requests <br />
  > const ipcRenderer = require('electron') <br />
    ipcRenderer.send('sendingeventname',someData)  // usually send call is asynchronous , we can use ipcRenderer.sendSync for synchronous calls <br />
    For listening events on ipcRenderer , we can do <br />
    ipcRenderer.on('asynchronous-reply',(event,args)=>{ <br />
      console.log("returned result is "+args) <br />
    })
