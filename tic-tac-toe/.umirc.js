
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'Login',
          path: '/user/login',
          component: '../pages/user/login'
        },
        {
          name: 'Register',
          path: '/user/register',
          component: '../pages/user/register'
        },
      ]
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/index'
        },
        {
          path: '/tic',
          component: '../pages/tic'
        },
        {
          path: '/room',
          component: '../pages/room'
        },
      ]
    }, 

  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'tic-tac-toe',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
