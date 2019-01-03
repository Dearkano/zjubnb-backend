import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/zhang/Documents/zjubnb-backend/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Login'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Register'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/RegisterResult'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import('../Dashboard/Analysis'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import('../Dashboard/Monitor'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import('../Forms/BasicForm'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import('../List/BasicList'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Profile/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import('../Profile/BasicProfile'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Center'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/center",
                "redirect": "/account/center/articles",
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Articles'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Applications'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Projects'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/Info'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/BaseView'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/SecurityView'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/BindingView'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/Users/zhang/Documents/zjubnb-backend/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/NotificationView'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('/Users/zhang/Documents/zjubnb-backend/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/zhang/Documents/zjubnb-backend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
