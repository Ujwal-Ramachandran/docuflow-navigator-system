
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
  documents_changed?: string;
}

export interface Workflow {
  id: string;
  name: string;
  location: string;
  status: WorkflowStatus;
  team_handling: string;
  documents: string;
  file_name?: string; // Legacy field for backward compatibility
  assigned_user: string;
  team_manager: string;
  assigned_date: string;
  workflow_history: WorkflowHistoryItem[];
  next_teams: string;
}

export interface Workflows {
  workflows: Workflow[];
}
