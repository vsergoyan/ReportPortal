module.exports = {
    default: {
        require: [
            'src/bdd/context/**/*.ts',
            'src/bdd/steps/**/*.ts',
            'src/bdd/hooks/**/*.ts'
        ],
        paths: [
            'src/bdd/features/**/*.feature'
        ],
        requireModule: [
            'ts-node/register'
        ],
        format: [
            'progress'
        ]
    }
};
