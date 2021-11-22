import { Books, Electronics, Mobile, Desktop, Laptop } from './testing';
import MainRaceBarChart from './components/MainRaceBarChart';
import HeatMap from './components/HeatMap';
import ParallelGraph from './components/ParallelGraph';
import BubbleChart from './components/BubbleChart';
import DotPlot from './components/DotPlot';
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
  {
    path:`${rootPath}/ParallelGraph`,
    component: ParallelGraph,
    breadcrumbName: 'ParallelGraph'
  },
  {
    path:`${rootPath}/BubbleChart`,
    component: BubbleChart,
    breadcrumbName: 'BubbleChart'
  },
  {
    path:`${rootPath}/DotPlot`,
    component: DotPlot,
    breadcrumbName: 'DotPlot'
  },
];

export default routes;
export { rootPath };
