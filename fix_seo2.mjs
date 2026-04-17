
import fs from "fs";
import path from "path";

const filesToFix = [
  "src/app/(public)/[lang]/blog/facebook-page-vs-website-nepali-businesses/page.tsx",
  "src/app/(public)/[lang]/blog/why-nepali-businesses-dont-have-websites/page.tsx",
  "src/app/(public)/[lang]/blog/school-website-nepal-why-every-school-should-be-online/page.tsx",
  "src/app/(public)/[lang]/blog/[slug]/page.tsx",
];

for (const filePath of filesToFix) {
  let content = fs.readFileSync(filePath, "utf8");

  // Fix "en": `https://hamrolink.com/en...`
  content = content.replace(/"en":\s*`https:\/\/hamrolink\.com\/en([^`]*)`/g, "\"en\": `https://hamrolink.com$1`");
  
  // Fix "x-default": `https://hamrolink.com/en...` just in case 
  content = content.replace(/"x-default":\s*`https:\/\/hamrolink\.com\/en([^`]*)`/g, "\"x-default\": `https://hamrolink.com$1`");

  fs.writeFileSync(filePath, content);
}
console.log("Fixed SEO URLs 2");

