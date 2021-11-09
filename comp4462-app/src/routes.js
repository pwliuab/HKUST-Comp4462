import { Books, Electronics, Mobile, Desktop, Laptop } from './testing';
const rootPath = process.env.PUBLIC_URL;

const routes = [

  {
    path: `${rootPath}/electronics`,
    component: Electronics,
    breadcrumbName: 'Electronics',
    routes: [
      {
        path: `${rootPath}/electronics/mobile/:id`,
        component: Mobile,
        breadcrumbName: 'Mobile Phone'
      },
      {
        path: `${rootPath}/electronics/desktop`,
        component: Desktop,
        breadcrumbName: 'Desktop PC'
      },
      {
        path: `${rootPath}/electronics/laptop`,
        component: Laptop,
        breadcrumbName: 'Laptop'
      }
    ]
  }
];

export default routes;
export { rootPath };
