import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { TokenFinishedList } from './pages/TokenFinishedList';
import { TokenFinishedPriorityList } from './pages/TokenFinishedPriorityList';
import { TokenGenerator } from './pages/TokenGenerator';
import { TokenList } from './pages/TokenList';
import { TokenListPriority } from './pages/TokenListPriority';
import { TokenViewer } from './pages/TokenViewer';

const routes = [
  {
    component: <TokenList />,
    name: 'Lista de Tokens',
    path: '/token-list',
  },
  {
    component: <TokenViewer />,
    name: 'Visualizador de Token',
    path: '/token-viewer',
  },
  {
    component: <TokenGenerator />,
    name: 'Gerar Token',
    path: '/token-generator',
  },
  {
    component: <TokenListPriority />,
    name: 'Lista de Tokens Prioritários',
    path: '/token-list-priority',
  },
  {
    component: <TokenFinishedList />,
    name: 'Lista de Tokens Atendidos',
    path: '/token-finished-list',
  },
  {
    component: <TokenFinishedPriorityList />,
    name: 'Lista de Tokens Prioritários Atendidos',
    path: '/token-finished-priority-list',
  },
  {
    component: <Home />,
    name: 'Home',
    path: '/',
  },
];

const Router = () => (
  <Routes>
    {routes.map(({ path, component }) => (
      <Route key={path} path={path} element={component} />
    ))}
  </Routes>
);
export default Router;
