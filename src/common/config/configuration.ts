const DEFAULT_PORT = 3000;

export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
  } as const);
