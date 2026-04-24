module.exports = {
  apps: [
    {
      name: "NEST-TURBO-BE",
      script: "pnpm prod",
      instances: 1,
      exec_mode: "fork",
      watch: false
    },
  ],
};