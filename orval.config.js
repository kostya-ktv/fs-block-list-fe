module.exports = {
    "main": {
        input: './lib/api/schema.yaml',
        output: {
            target: './lib/api/generated.ts',
            prettier: true,
            override: {
                mutator: {
                    path: './lib/api/api-instance.ts',
                    name: 'createInstance'
                }
            }
        }
    }
}