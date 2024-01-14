import { defineConfig } from 'orval'

export default defineConfig({
  stockApi: {
    output: {
      mode: 'tags-split',
      target: './generated/photoStockApi.ts',
      schemas: './generated/model',
      client: 'react-query',
      // mock: true,
    },
    input: {
      target: './swagger.yaml',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})
