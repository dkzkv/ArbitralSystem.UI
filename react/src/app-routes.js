import { withNavigationWatcher } from './contexts/navigation';
import { PMIPage, TasksPage, ProfilePage, ServerPage } from './pages';

const routes = [
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/pmi',
    component: PMIPage
  }
  ,
  {
    path: '/servers',
    component: ServerPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
