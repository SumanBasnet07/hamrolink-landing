
import fs from "fs";
import path from "path";

const filesToFix = [
  "src/app/(public)/[lang]/blog/why-nepali-businesses-dont-have-websites/page.tsx",
];

for (const filePath of filesToFix) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(/"en":\s*"https:\/\/hamrolink\.com\/en([^"]*)"/g, "\"en\": \"https://hamrolink.com$1\"");
  content = content.replace(/"x-default":\s*"https:\/\/hamrolink\.com\/en([^"]*)"/g, "\"x-default\": \"https://hamrolink.com$1\"");

  fs.writeFileSync(filePath, content);
}
console.log("Fixed SEO URLs 3");

