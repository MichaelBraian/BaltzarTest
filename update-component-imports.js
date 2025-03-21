const fs = require('fs');
const path = require('path');

// Directories to search for files
const directories = [
  path.join(__dirname, 'components', 'ui'),
  path.join(__dirname, 'hooks')
];

// Find all TypeScript and TypeScript JSX files
function getAllFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
}

// Read a file and replace imports
function updateImports(filePath) {
  console.log(`Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  
  // If we're in components/ui directory, use relative imports
  if (filePath.includes(path.join('components', 'ui'))) {
    // Replace imports from other UI components with relative imports
    updatedContent = updatedContent.replace(
      /from\s+["']@\/components\/ui\/([^"']+)["']/g,
      (match, componentName) => `from "./${componentName}"`
    );
  } else {
    // If we're outside components/ui directory, use proper path
    updatedContent = updatedContent.replace(
      /from\s+["']@\/components\/ui\/([^"']+)["']/g,
      (match, componentName) => `from "../components/ui/${componentName}"`
    );
  }
  
  // Only write the file if changes were made
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated imports in: ${filePath}`);
    return true;
  }
  
  console.log(`No changes needed in: ${filePath}`);
  return false;
}

// Main function
function main() {
  let updatedCount = 0;
  
  directories.forEach(dir => {
    console.log(`\nSearching in directory: ${dir}`);
    
    try {
      const files = getAllFiles(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (updateImports(filePath)) {
          updatedCount++;
        }
      });
    } catch (error) {
      console.error(`Error processing directory ${dir}: ${error.message}`);
    }
  });
  
  console.log(`\nCompleted! Updated ${updatedCount} files.`);
}

main(); 