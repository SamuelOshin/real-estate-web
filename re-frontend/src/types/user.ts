/**
 * Roles match PRD section 7 (Roles & Permissions) exactly:
 * Super Admin, Agent, Finance/Docs. Do not add a role here without
 * updating src/config/permissions.config.ts and the PRD.
 */
export type Role = "super_admin" | "agent" | "finance_docs";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
