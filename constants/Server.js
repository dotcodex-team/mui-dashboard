// import {env} from '@helpers'


let wsHostServer;

if(process.browser){
  // wsHostServer = env.hostServer.replace('http','ws').replace('https','ws')
}

export default {
  host: 'localhost',
  // wsHost: wsHostServer
};
