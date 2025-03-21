const fs = require('fs');
const path = require('path');

// Directory to search for files
const componentsDir = path.join(__dirname, 'components', 'ui');

// Find all TypeScript and TypeScript JSX files
function getAllFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
}

// Read a file and replace imports
function updateImports(filePath) {
  console.log(`Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace @/lib/utils with ../../lib/utils
  const updatedContent = content.replace(
    /import\s+\{\s*cn\s*\}\s+from\s+["']@\/lib\/utils["']/g,
    'import { cn } from "../../lib/utils"'
  );
  
  // Replace @/components/ui/label with ./label
  const furtherupdatedContent = updatedContent.replace(
    /import\s+\{\s*Label\s*\}\s+from\s+["']@\/components\/ui\/label["']/g,
    'import { Label } from "./label"'
  );
  
  // Replace any other @/ imports if needed
  let finalContent = furtherupdatedContent;
  
  // Only write the file if changes were made
  if (content !== finalContent) {
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`Updated imports in: ${filePath}`);
    return true;
  }
  
  console.log(`No changes needed in: ${filePath}`);
  return false;
}

// Main function
function main() {
  const files = getAllFiles(componentsDir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    if (updateImports(filePath)) {
      updatedCount++;
    }
  });
  
  console.log(`\nCompleted! Updated ${updatedCount} files.`);
}

main(); 