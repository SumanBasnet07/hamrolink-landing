
import fs from "fs";
import path from "path";

const filesToFix = [
  "src/app/(public)/[lang]/features/layout.tsx",
  "src/app/(public)/[lang]/stories/layout.tsx",
  "src/app/(public)/[lang]/pricing/layout.tsx",
  "src/app/(public)/[lang]/docs/layout.tsx",
  "src/app/(public)/[lang]/contact/layout.tsx",
  "src/app/(public)/[lang]/ai/layout.tsx",
  "src/app/(public)/[lang]/about/layout.tsx",
  "src/app/(public)/[lang]/blog/page.tsx",
  "src/app/(public)/[lang]/blog/[slug]/page.tsx",
  "src/app/(public)/[lang]/blog/why-nepali-businesses-dont-have-websites/page.tsx",
  "src/app/(public)/[lang]/blog/school-website-nepal-why-every-school-should-be-online/page.tsx",
  "src/app/(public)/[lang]/blog/facebook-page-vs-website-nepali-businesses/page.tsx",
  "src/app/(public)/[lang]/(legal)/faqs/layout.tsx",
  "src/app/(public)/[lang]/(legal)/privacy/layout.tsx",
  "src/app/(public)/[lang]/(legal)/terms/layout.tsx",
  "src/app/(public)/[lang]/(legal)/refund/layout.tsx"
];

for (const filePath of filesToFix) {
  let content = fs.readFileSync(filePath, "utf8");

  // Fix hardcoded /en/ to just / for "en" and "x-default"
  content = content.replace(/en:\s*"https:\/\/hamrolink\.com\/en([^"]*)"/g, "en: \"https://hamrolink.com$1\"");
  content = content.replace(/"x-default":\s*"https:\/\/hamrolink\.com\/en([^"]*)"/g, "\"x-default\": \"https://hamrolink.com$1\"");
  
  // Also handle backticks
  content = content.replace(/en:\s*`https:\/\/hamrolink\.com\/en([^`]*)`/g, "en: `https://hamrolink.com$1`");
  content = content.replace(/"x-default":\s*`https:\/\/hamrolink\.com\/en([^`]*)`/g, "\"x-default\": `https://hamrolink.com$1`");

  // Fix path variables
  content = content.replace(/const path = `https:\/\/hamrolink\.com\/\$\{lang\}([^`]+)`;/g, "const path = lang === \"en\" ? `https://hamrolink.com$1` : `https://hamrolink.com/ne$1`;");
  
  // Handle canonical inline
  content = content.replace(/canonical:\s*`https:\/\/hamrolink\.com\/\$\{lang\}([^`]+)`/g, "canonical: lang === \"en\" ? `https://hamrolink.com$1` : `https://hamrolink.com/ne$1`");
  
  // blog/[slug]/page.tsx: `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${post.slug}`
  content = content.replace(/canonical:\s*`https:\/\/hamrolink\.com\/\$\{ne \? "ne" : "en"\}\/([^`]+)`/g, "canonical: ne ? `https://hamrolink.com/ne/$1` : `https://hamrolink.com/$1`");

  // some older layouts might have hardcoded "/en" in their canonical string instead of language variable:
  content = content.replace(/canonical:\s*"https:\/\/hamrolink\.com\/en([^"]*)"/g, "canonical: \"https://hamrolink.com$1\"");

  fs.writeFileSync(filePath, content);
}
console.log("Fixed SEO URLs");

