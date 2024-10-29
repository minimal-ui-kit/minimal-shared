import fs from 'fs';
import path from 'path';

const dir = './';

// Read the package.json file
const packageJsonPath = path.join(dir, './package.json');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Update @minimals/utils to "latest"
if (packageJson.dependencies && packageJson.dependencies['@minimals/utils']) {
  packageJson.dependencies['@minimals/utils'] = 'latest';
}

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated @minimals/utils to latest in package.json');
