async function resolvedComponent<T>(Component: () => Promise<T>): Promise<() => T> {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

export default resolvedComponent;
