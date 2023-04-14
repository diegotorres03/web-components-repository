import fs from 'fs-extra';
import { exec } from 'child_process';
import ProgressBar from 'progress';
import readline from 'readline';

const BRANCH = 'feature/template_cli';
const REPO_URL =
  'https://github.com/diegotorres03/web-components-repository.git';

function clearTerminal() {
  process.stdout.write('\x1Bc');
}
function updateProgressBar(progressBar, tickValue) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  progressBar.tick(tickValue);
  if (progressBar.complete) {
    console.log('Done!');
  }
}

// Clone the specified repository using sparse checkout
// TODO: Move this function to a separate file
async function gitSparseClone(rurl, localdir, ...sparsePaths) {
  return new Promise((resolve, reject) => {
    const commands = [
      `mkdir -p "${localdir}"`,
      `cd "${localdir}"`,
      'git init',
      `git remote add -f origin "${rurl}"`,
      'git config core.sparseCheckout true',
    ];

    for (const path of sparsePaths) {
      commands.push(`echo "${path}" >> .git/info/sparse-checkout`);
    }

    commands.push(`git pull origin ${BRANCH}`);

    const fullCommand = commands.join(' && ');

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// Create the required folder structure for the project
async function createFolderStructure(folderPath) {
  console.log('Creating folder structure...');
  const srcFolder = `${folderPath}/src`;
  const componentsFolder = `${srcFolder}/components`;
  const libFolder = `${srcFolder}/lib`;

  for (const folder of [srcFolder, componentsFolder, libFolder]) {
    try {
      await fs.access(folder);
    } catch {
      await fs.mkdir(folder);
    }
  }
}

// Clone the web components folder from the repository
async function cloneWebComponentsFolderFromRepo(tempFolderPath) {
  console.log('Cloning web components folder from repository...');
  const sparsePath = ['web-components', 'docs'];
  try {
    await fs.mkdir(tempFolderPath);
    await gitSparseClone(REPO_URL, tempFolderPath, sparsePath);
    console.log('Sparse clone completed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Build the bundle for the project
async function buildBundle(tempFolderPath) {
  console.log('Building bundle...');
  return new Promise((resolve, reject) => {
    exec(
      'npm install && npm run build:dev',
      { cwd: `${tempFolderPath}/web-components` },
      (error, stdout, stderr) => {
        console.info(stdout);
        if (error) {
          console.error(stderr);
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

// Copy the configuration files from the cloned repository to the project folder
async function copyConfigFiles(folderPath, wcFolderPath, docsFolderPath, projectName) {
  console.log('Copying configuration files...');

  const packageJSONPath = `${wcFolderPath}/assets/configs/template_package.json`;
  const packageJSON = await fs.readJson(packageJSONPath);

  packageJSON.name = projectName;

  await fs.writeJson(`${folderPath}/package.json`, packageJSON, { spaces: 2 });
  await fs.copy(
    `${wcFolderPath}/assets/configs/webpack.config.dwck.js`,
    `${folderPath}/webpack.config.js`,
  );
  await fs.copy(
    `${wcFolderPath}/assets/configs/index.js`,
    `${folderPath}/src/index.js`,
  );
  await fs.copy(
    `${docsFolderPath}/docs`,
    `${folderPath}/docs`,
    { recursive: true },
  );
  await fs.copy(
    `${wcFolderPath}/assets/configs/index.html`,
    `${folderPath}/index.html`,
  );
  await fs.copy(
    `${wcFolderPath}/src/global/style-tools.css`,
    `${folderPath}/src/lib/style-tools.css`,
  );
  await fs.copy(
    `${wcFolderPath}/src/global/themes`,
    `${folderPath}/src/lib/themes`,
  );
  await fs.copy(
    `${wcFolderPath}/src/global/web-tools.js`,
    `${folderPath}/src/lib/web-tools.js`,
  );
}

// Copy the built bundle to the project folder
async function copyBundle(tempFolderPath, projectFolderPath) {
  console.log('Copying built bundle to the project folder...');
  const bundlePath = `${tempFolderPath}/web-components/dist`;
  const targetPath = `${projectFolderPath}/src/lib`;
  const files = await fs.readdir(bundlePath);
  for (const file of files) {
    if (file === 'dWCk.js') {
      await fs.copy(`${bundlePath}/${file}`, `${targetPath}/${file}`);
    }
  }
}

// Main function to create a new Dwck project folder
export async function createDwckProjectFolder(projectName) {
  clearTerminal();
  const progressBar = new ProgressBar('[:bar] :percent :etas', {
    total: 100,
    width: 40,
    complete: '=',
    incomplete: ' ',
  });

  try {
    const folderPath = `./${projectName}`;

    if (await fs.pathExists(folderPath)) {
      throw new Error(`Folder '${folderPath}' already exists.`);
    }
    await fs.mkdir(folderPath);
    await createFolderStructure(folderPath);
    updateProgressBar(progressBar, 10);
    const wcFolderPath = `./${projectName}_temp/web-components`;
    const docsFolderPath = `./${projectName}_temp/docs`;

    await cloneWebComponentsFolderFromRepo(wcFolderPath);
    updateProgressBar(progressBar, 30);


    await copyConfigFiles(
      folderPath,
      wcFolderPath,
      docsFolderPath,
      projectName,
    );
    updateProgressBar(progressBar, 10);
    await buildBundle(wcFolderPath);
    updateProgressBar(progressBar, 30);
    await copyBundle(wcFolderPath, folderPath);
    await fs.rm(wcFolderPath, { recursive: true });
    console.log('Project folder creation completed successfully!');
    updateProgressBar(progressBar, 20);
    return folderPath;
  } catch (error) {
    console.error(`Failed to create project folder: ${error.message}`);
    throw error;
  }
}
