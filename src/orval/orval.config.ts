import { defineConfig } from 'orval'

export default defineConfig({
  stockApi: {
    input: {
      target: './swagger.yaml',
    },
    output: {
      mode: 'tags-split',
      schemas: './generated/model',
      target: './generated/photoStockApi.ts',
      override: {
        mutator: {
          path: '../lib/axios/init.ts',
          name: 'customAxiosInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})
