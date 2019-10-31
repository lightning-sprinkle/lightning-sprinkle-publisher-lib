var bc = new BroadcastChannel('test_channel');


bc.onmessage = function (ev) { console.log(ev); }