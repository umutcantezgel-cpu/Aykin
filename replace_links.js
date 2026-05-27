const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Replace imports
  const importRegex = /import\s+Link\s+from\s+['"]next\/link['"];?/g;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, "import { TransitionLink } from '@/components/ui/TransitionLink';");
    hasChanges = true;
  }
  
  // Only replace tags if we replaced the import, or if it already has TransitionLink import but lingering <Link>
  // Actually, we should just replace `<Link` -> `<TransitionLink` if there is no local component named Link
  if (content.includes("import { TransitionLink }")) {
    const openingRegex = /<Link(\s|>)/g;
    const closingRegex = /<\/Link>/g;
    
    if (openingRegex.test(content)) {
      content = content.replace(openingRegex, "<TransitionLink$1");
      hasChanges = true;
    }
    if (closingRegex.test(content)) {
      content = content.replace(closingRegex, "</TransitionLink>");
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

walkDir('./src/app', processFile);
walkDir('./src/components', processFile);
console.log('Done!');
