/**
 * Central export point for all tools organized by domain.
 *
 * This file aggregates all tools from different domains into a single
 * export, making it easy to import all tools in main.ts while keeping
 * the domain separation.
 */

import { createListOrdersTool } from "./orders/list.ts";
import { createGetOrderTool } from "./orders/get.ts";

// Export all tools from all domains
export const tools = [
  createListOrdersTool,
  createGetOrderTool,
];

// Re-export domain-specific tools for direct access if needed
export { todoTools } from "./todos.ts";
export { userTools } from "./user.ts";
