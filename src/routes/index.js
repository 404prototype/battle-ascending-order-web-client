import App from '../App';
import Home from '../pages/Home';
import Room from '../pages/room/_index';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/room/:id',
        element: <Room />
      }
    ]
  }
];

export default routes;
