const fs = require('fs');
const path = require('path');

function findConflicts(filename) {
  const filepath = path.join(__dirname, filename);
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  let report = `Conflicts in ${filename}:\n`;
  let currentConflict = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('<<<<<<<')) {
      report += `\nLine ${i + 1}: Conflict Start\n`;
      for (let j = Math.max(0, i - 5); j < i; j++) {
        report += `  ${j + 1}: ${lines[j]}\n`;
      }
      report += `>>>>> CONFLICT CONTENT START >>>>>\n`;
      report += `  ${i + 1}: ${line}\n`;
    } else if (line.startsWith('=======')) {
      report += `  ${i + 1}: ${line}\n`;
    } else if (line.startsWith('>>>>>>>')) {
      report += `  ${i + 1}: ${line}\n`;
      report += `<<<<< CONFLICT CONTENT END <<<<<\n`;
      for (let j = i + 1; j < Math.min(lines.length, i + 6); j++) {
        report += `  ${j + 1}: ${lines[j]}\n`;
      }
    } else {
      // If we are within a conflict, or just want to log
      const isInConflict = report.split('>>>>> CONFLICT CONTENT START >>>>>').length > report.split('<<<<< CONFLICT CONTENT END <<<<<').length;
      if (isInConflict) {
        report += `  ${i + 1}: ${line}\n`;
      }
    }
  }
  return report;
}

try {
  let finalReport = '';
  finalReport += findConflicts('views.js');
  fs.writeFileSync(path.join(__dirname, 'conflicts_report.txt'), finalReport, 'utf8');
  console.log('Report written successfully!');
} catch (e) {
  console.error(e);
}
