import { Books, Electronics, Mobile, Desktop, Laptop } from './testing';
import MainRaceBarChart from './components/MainRaceBarChart';
import HeatMap from './components/HeatMap';
import ParallelGraph from './components/ParallelGraph';
import BubbleChart from './components/BubbleChart';
import DotPlot from './components/DotPlot';
import RBarC from './components/RBarC';
import Hosting from './components/Hosting';
import ParallelGraphAdt from './components/ParallelGraphAdt';
import ParallelGraphPop from './components/ParallelGraphPop';
import Overview from './components/Overview';
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
    exact: true,
    breadcrumbName: 'ParallelGraph'
  },
  {
    path:`${rootPath}/ParallelGraphAdt`,
    component: ParallelGraphAdt,
    exact: true,
    breadcrumbName: 'ParallelGraphAdt'
  },
  {
    path:`${rootPath}/`,
    component: ParallelGraph,
    exact: true,
    breadcrumbName: 'ParallelGraph'
  },

  {
    path:`${rootPath}/Overview`,
    component: Overview,
    exact: true,
    breadcrumbName: 'Overview'
  },

  {
    path:`${rootPath}/ParallelGraphPop`,
    component: ParallelGraphPop,
    exact: true,
    breadcrumbName: 'ParallelGraphPop'
  },
  {
    path:`${rootPath}/BubbleChart`,
    component: BubbleChart,
    exact: true,
    breadcrumbName: 'BubbleChart'
  },
  {
    path:`${rootPath}/DotPlot`,
    component: DotPlot,
    breadcrumbName: 'DotPlot'
  },
  {
    path:`${rootPath}/RBarC`,
    component: RBarC,
    exact: true,
    breadcrumbName: 'RBarC'
  },
  {
    path:`${rootPath}/Hosting`,
    component: Hosting,
    breadcrumbName: 'Hosting'
  },
];

export default routes;
export { rootPath };
