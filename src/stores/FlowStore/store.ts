/**
 * NEED TO CHECKOUT IF THIS STORE CAN BE UTIL FOR FUTURE
 */

import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import STEPS, { IStepRoute, Step } from '@/constants/steps/steps';
import { IOption } from '@/types/interfaces/flow';

interface State {
  activeStep: Step | null;
  showStepper: boolean;
  activeRoute: IStepRoute | null;
  activeCarePlan: IOption | null;
  steps: Step[]; // Array to hold the list of steps
  setActiveStep: (step: Step) => void;
  setShowStepper: (value: boolean) => void;
  setActiveRoute: (step: IStepRoute) => void;
  setActiveCarePlan: (carePlan: IOption) => void;
  addStep: (step: Step) => void; // Function to add a step to the list
  removeStep: (stepId: number) => void; // Function to remove a step from the list
  addRouteToStep: (stepId: number, route: IStepRoute) => void; // Function to add a route to a step
  resetStepsToInitial: () => void;
  updateRoute: (stepId: number, pathname: string, slug: string, providerId: string) => void;
}

const useStepperStore = createWithEqualityFn<State>(
  (set) => ({
    activeStep: null,
    showStepper: false,
    activeRoute: null,
    activeCarePlan: null,
    steps: STEPS,
    setActiveStep: (step) => set({ activeStep: step }),
    setShowStepper: (value) => set({ showStepper: value }),
    setActiveRoute: (route) => set({ activeRoute: route }),
    setActiveCarePlan: (carePlan) => set({ activeCarePlan: carePlan }),
    addStep: (step) => set((state) => ({ steps: [...state.steps, step] })),
    removeStep: (stepId) =>
      set((state) => ({
        steps: state.steps.filter((step) => step.id !== stepId),
      })),
    addRouteToStep: (stepId, route) =>
      set((state) => ({
        steps: state.steps.map((step) =>
          step.id === stepId ? { ...step, routes: [...step.routes, route] } : step
        ),
      })),
    resetStepsToInitial: () => set(() => ({ steps: STEPS })),
    updateRoute: (stepId: number, pathname: string, slug: string, providerId: string) =>
      set((state) => ({
        steps: state.steps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                routes: step.routes.map((route) =>
                  route.pathname === pathname
                    ? {
                        ...route,
                        provider: {
                          slug,
                          id: providerId,
                        },
                      }
                    : route
                ),
              }
            : step
        ),
      })),
  }),

  shallow
);

export default useStepperStore;
