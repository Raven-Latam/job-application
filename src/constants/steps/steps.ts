export interface IProvider {
  slug: string;
  id: string;
}
export interface IStepRoute {
  pathname: string;
  background: string;
  provider?: IProvider;
}

export interface Step {
  id: number;
  name: string;
  routes: IStepRoute[];
}

const STEPS: Step[] = [
  {
    id: 1,
    name: '',
    routes: [{ pathname: '/example', background: 'teal.200' }],
  },
];

export default STEPS;
