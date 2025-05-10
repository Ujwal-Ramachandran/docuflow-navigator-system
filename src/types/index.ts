
// User-related types
export type UserRole = 'admin' | 'team_manager' | 'member';

export interface User {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  team?: string; // For team managers and members only
}

export interface Users {
  users: User[];
}

// Team-related types
export interface TeamMember {
  manager: string;
  member: string; // Comma-separated list
}

export interface Teams {
  teams: {
    [teamName: string]: TeamMember;
  };
}

// Workflow-related types
export type WorkflowStatus = 'In Progress' | 'Review' | 'Complete' | 'Rejected';

export interface WorkflowHistoryItem {
  team: string;
  username: string;
  approved_by: string;
  approved_on: string;
  comments: string;
}

export interface Workflow {
  id: string;
  name: string;
  location: string;
  status: WorkflowStatus;
  team_handling: string;
  file_name: string;
  assigned_user: string;
  team_manager: string;
  assigned_date: string;
  workflow_history: WorkflowHistoryItem[];
}

export interface Workflows {
  workflows: Workflow[];
}
