import templatesData from "../templates.json";

export interface Template {
  id: string;
  name: string;
  key: string;
  category: string;
  description?: string;
  thumbnail: string;
  plan?: string[];
  status?: string;
}

/**
 * Reads the local templates.json file, normalizes all template identifiers
 * (mapping MongoDB $oid structures and key fallbacks), filters templates
 * matching the specified category/industry, and limits the output array.
 * 
 * @param category The active industry parameter (e.g., 'consultancy', 'ecommerce')
 * @param limit The maximum number of templates to return
 */
export function getTemplatesByCategory(category: string, limit: number): Template[] {
  if (!category) return [];
  
  const normalizedCategory = category.toLowerCase().trim();

  const allTemplates = (templatesData as any[]).map((t) => {
    // Safely extract the ID string from Mongoose ObjectID representation or fallback to key
    const id = typeof t._id === "string" ? t._id : t._id?.$oid || t.key;
    return {
      id,
      name: t.name || "",
      key: t.key || "",
      category: t.category || "",
      description: t.description || "",
      thumbnail: t.thumbnail || "",
      plan: t.plan || [],
      status: t.status || "active",
    };
  });

  // Filter templates that have a matching category and are marked active
  return allTemplates
    .filter(
      (t) =>
        t.category.toLowerCase() === normalizedCategory &&
        t.status.toLowerCase() === "active"
    )
    .slice(0, limit);
}

/**
 * Normalizes and returns all active templates from templates.json.
 */
export function getAllTemplates(): Template[] {
  return (templatesData as any[]).map((t) => {
    const id = typeof t._id === "string" ? t._id : t._id?.$oid || t.key;
    return {
      id,
      name: t.name || "",
      key: t.key || "",
      category: t.category || "",
      description: t.description || "",
      thumbnail: t.thumbnail || "",
      plan: t.plan || [],
      status: t.status || "active",
    };
  }).filter((t) => t.status.toLowerCase() === "active");
}

/**
 * Normalizes and filters down only to the 88 main active templates.
 */
export function getMainTemplates(): Template[] {
  const MAIN_CATEGORIES = [
    'school', 'consultancy', 'restaurant', 'ecommerce', 
    'portfolio', 'blog', 'business', 'landing', 'health', 'club'
  ];
  return getAllTemplates().filter((t) => 
    MAIN_CATEGORIES.includes(t.category.toLowerCase().trim())
  );
}
