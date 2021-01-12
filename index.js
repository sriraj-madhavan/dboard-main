import 'zone.js'; // for angular subapp
import './index.less';

import { initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } 
from 'qiankun';

registerMicroApps(
  [
    {
      name: 'react16',
      entry: '//localhost:7777',
      container: '#container1',
      // loader,
      activeRule: '/react16',
    },
    {
      name: 'react161`',
      entry: '//localhost:7777',
      container: '#container2',
      // loader,
      activeRule: '/react16',
    },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/react16');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
