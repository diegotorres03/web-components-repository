const fs = require('fs/promises')

run()


async function run() {
    const readme = (await fs.readFile('../step-by-step.md')).toString('utf8')
    // console.log(readme)
    const steps = readme.split(new RegExp('---'))
    // console.log(steps)
    const stepsJson = {}

    console.log(steps.length)
    steps.forEach((step, index) => {
        const items = []
        try {
            const chapter = step.match(/# (\d\.\d\.\d)/)[1]
            const files = step.match(/\*\*file:\*\* `(.*)`/g)
            const replaceKeys = step.match(/\*\*replace key:\*\* `(.*)`/g)
            // const content = step.match(/```(.*)\n([\s\S]*?)\n```/g)
            // const content = step.match(/\`\`\`(.*)([\s\S].*)/g)
            // const content = step.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/)
            const content = step.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/g)

            console.log(chapter)
            console.log('content')
            console.log(content)
            console.log(content && content.length)
            console.log('================')

            Array.isArray(files) && files.forEach((file, index) => {
                console.log('file, index', file, index)
                if (!items[index]) items[index] = {}
                items[index].path = file.match(/\*\*file:\*\* `(.*)`/).pop()
            })

            Array.isArray(replaceKeys) && replaceKeys.forEach((key, index) => {
                console.log('key, index', key, index)
                if (!items[index]) items[index] = {}
                items[index].key = key.match(/\*\*replace key:\*\* `(.*)`/).pop()
            })


            Array.isArray(content) && content.forEach((code, index) => {
                // const code = item.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/)[2]
                console.log('key, index', code, index)
                if (!items[index]) items[index] = {}
                items[index].value = code.match(/\`\`\`(.*)([\s\S]*?)\`\`\`/)[2]
            })
            stepsJson[chapter] = {
                content: items
            }
        } catch (err) {
            console.error(err)
            console.info('it might be an empty item, if  --- are left at the end, the next item will be empty')
        }
    })

    console.log(JSON.stringify(stepsJson, null, 2))
    await fs.writeFile('./step-by-step.json', JSON.stringify(stepsJson, null, 2))
    // steps.map(step => {})
}
