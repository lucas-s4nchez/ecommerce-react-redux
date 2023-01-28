export const getEnvironments = () => {
  const enviroments = import.meta.env;

  return {
    ...enviroments,
  };
};
