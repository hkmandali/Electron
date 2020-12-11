const {electron,Notification,remote} = require('electron')
const path = require('path')
//const BrowserWindow = electron.remote
const axios = require('axios')
const { default: Axios } = require('axios')
const ipcRenderer = require('electron').ipcRenderer
const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')

targetPriceVal =0;
const notification={
    title:'Stock Alert',
    body:'Stock price just beat your target'
}

function getStockPrice(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
         .then(res=>{
             const cryptos = res.data.BTC.USD
             //console.log(cryptos)
             price.innerHTML = 'INR'+ cryptos.toLocaleString('en')

             if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD)
             {
                // console.log("  targetPriceVal  is  "+ targetPriceVal)
                console.log(notification);
                
                //const myNotification = new Notification(notification.title,notification)
                const myNotification = new electron.remote.Notification('Stock Alert',{body:'Stock price just beat your target'})
                
                //console.log("triggered notification")
             }
         })

}

getStockPrice()

setInterval(getStockPrice,3000);

//notifyBtn.onclick = onclickNotify

notifyBtn.addEventListener('click',function(event){
    var price = document.getElementById('targetVal').value
    console.log(price)
    ipcRenderer.send('update-notify-value',price)
})

// notifyBtn.onclick = test;

// function test(){
//     console.log("clicer")
//     const win = new BrowserWindow({width:800,height:600,enableRemoteModule:true,enableremotemodule:true})
//     win.loadURL('https://github.com')
// }


// this is for opening a new window , currently remote window is not working in the current setup
/*
notifyBtn.addEventListener('click',function(event){
    console.log("clicked ");
    const modalPath = path.join('file://',__dirname,'add.html');
    console.log(modalPath);
    let win = new BrowserWindow({
        frame: false,
        transparent:true,
        alwaysOnTop : true,
        width: 800,
        height: 600,
        webPreferences: {
          enableRemoteModule: true
        }
      });
    win.on('close',function(){win=null});
    win.loadURL(modalPath);
    win.show();
})
*/

ipcRenderer.on('targetPriceVal',function(event,args){
    targetPriceVal = Number(args)
    //console.log("  targetPriceVal  is  " +targetPriceVal)
    targetPrice.innerHTML='INR'+targetPriceVal.toLocaleString('en')
})