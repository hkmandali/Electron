//const { desktopCapturer,remote } = require('electron');
const {desktopCapturer,ipcRenderer,app,BrowserWindow, MenuItem} = require('electron');
const { stderr } = require('process');
const exec = require('child_process').exec

//const { dialog, Menu } = remote;
const videoElement = document.querySelector('video');

const startBtn = document.querySelector('startButton');
const stopBtn = document.querySelector('stopButton');
const videoSelBtn = document.getElementById('videoselectButton');
videoSelBtn.onclick =  getVideo;

const whoBtn = document.getElementById('whoamI')
whoBtn.onclick = whoamI

function whoamI(){
    exec('whoami',function(error,stdout,stderr){
        console.log(stdout)
    })

}

async function getVideo()
{
    var insources = await desktopCapturer.getSources({
        types:['window','screen']
    });
    //console.log(insources);
    const map = insources.map(source =>{
        return{
            label: source.name
        };
    });
    ipcRenderer.send('buildTemplate',map);  // sending a request to the main process

    // the below code cant be implemented directly in the render process as this doesnt have access to the system api
    /*
    const videoOptionsMenu = Menu.buildFromTemplate(
        insources.map(source => {
          return {
            label: source.name,
            click: () => selectSource(source)
          };
        })
      );
    */
    
}


  

