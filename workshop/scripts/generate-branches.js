const { spawn, exec } = require('child_process')

const branchesData = {

    'ch1.1.1': { newBranch: `git checkout -b ch1.1.1`, branch: `git checkout ch1.1.1` },
    'ch1.1.2': { newBranch: `git checkout -b ch1.1.2`, branch: `git checkout ch1.1.2` },
    'ch1.2.1': { newBranch: `git checkout -b ch1.2.1`, branch: `git checkout ch1.2.1` },
    'ch1.2.2': { newBranch: `git checkout -b ch1.2.2`, branch: `git checkout ch1.2.2` },
    'ch2.1.1': { newBranch: `git checkout -b ch2.1.1`, branch: `git checkout ch2.1.1` },
    'ch2.1.2': { newBranch: `git checkout -b ch2.1.2`, branch: `git checkout ch2.1.2` },
    'ch2.1.3': { newBranch: `git checkout -b ch2.1.3`, branch: `git checkout ch2.1.3` },
    'ch2.2.1': { newBranch: `git checkout -b ch2.2.1`, branch: `git checkout ch2.2.1` },
    'ch2.2.2': { newBranch: `git checkout -b ch2.2.2`, branch: `git checkout ch2.2.2` },
    'ch2.2.3': { newBranch: `git checkout -b ch2.2.3`, branch: `git checkout ch2.2.3` },
    'ch2.3.1': { newBranch: `git checkout -b ch2.3.1`, branch: `git checkout ch2.3.1` },
    'ch2.3.2': { newBranch: `git checkout -b ch2.3.2`, branch: `git checkout ch2.3.2` },
    'ch3.1.1': { newBranch: `git checkout -b ch3.1.1`, branch: `git checkout ch3.1.1` },
    'ch3.1.2': { newBranch: `git checkout -b ch3.1.2`, branch: `git checkout ch3.1.2` },
    'ch3.2.1': { newBranch: `git checkout -b ch3.2.1`, branch: `git checkout ch3.2.1` },
    'ch3.2.2': { newBranch: `git checkout -b ch3.2.2`, branch: `git checkout ch3.2.2` },
    'ch3.2.3': { newBranch: `git checkout -b ch3.2.3`, branch: `git checkout ch3.2.3` },
    'ch4.1.1': { newBranch: `git checkout -b ch4.1.1`, branch: `git checkout ch4.1.1` },
    'ch4.1.2': { newBranch: `git checkout -b ch4.1.2`, branch: `git checkout ch4.1.2` },
    'ch4.2.1': { newBranch: `git checkout -b ch4.2.1`, branch: `git checkout ch4.2.1` },
    'ch4.2.2': { newBranch: `git checkout -b ch4.2.2`, branch: `git checkout ch4.2.2` },
    'ch4.3.1': { newBranch: `git checkout -b ch4.3.1`, branch: `git checkout ch4.3.1` },
    'ch4.3.2': { newBranch: `git checkout -b ch4.3.2`, branch: `git checkout ch4.3.2` },
    'ch5.1.1': { newBranch: `git checkout -b ch5.1.1`, branch: `git checkout ch5.1.1` },

}

async function wait(time = 1_000) {
    return new Promise(resolve => setTimeout(resolve, time))
}

run()

function command(commands) {
    return new Promise((resolve, reject) => {

        const ls = exec(commands, (error, stdout, stderr) => {
            if (error) {
                return reject(error)
                // console.log(error.stack)
                // console.log('Error code: ' + error.code)
                // console.log('Signal received: ' + error.signal)
            }
            console.log('Child Process STDOUT: ' + stdout)
            console.log('Child Process STDERR: ' + stderr)
            resolve({ stderr, stdout })
        })

        ls.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code)
        })
    })
}

async function createBranch(newBranch) {
    console.log('first branch', await command(`git checkout -b ${newBranch}`))
}


async function run() {
    // start on master
    // const branchesIds = Object.keys(branchesData)

    for (let id in branchesData) {
        console.log(id)
        // console.log
        // await createBranch('test1.1.1')
    }

    // create all branch structure
    // replace empty todo with solved todo and code 



}

