import fs from 'fs';
import path from 'path';

const dir = './';

// Read the package.json file
const packageJsonPath = path.join(dir, './package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Reset @minimals/utils to workspace:*
if (packageJson.dependencies && packageJson.dependencies['@minimals/utils']) {
  packageJson.dependencies['@minimals/utils'] = 'workspace:*';
}

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Reset @minimals/utils to workspace:* in package.json');
