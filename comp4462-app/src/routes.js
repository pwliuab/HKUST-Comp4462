import { Books, Electronics, Mobile, Desktop, Laptop } from './testing';
import MainRaceBarChart from './components/MainRaceBarChart';
import HeatMap from './components/HeatMap';
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
      },
    ]
  },
  {
    path:`${rootPath}/raceBC`,
    component: MainRaceBarChart,
    breadcrumbName: 'MainRaceBarChart'
  },
  {
    path:`${rootPath}/heatMap`,
    component: HeatMap,
    breadcrumbName: 'heatMap'
  },
];

export default routes;
export { rootPath };
