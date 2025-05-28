
import { Users, Teams, Workflows } from '../types';

export const mockUsers: Users = {
  users: [
    {
      name: "John Doe",
      username: "johndoe",
      password: "password123",
      role: "admin"
    },
    {
      name: "Jane Smith",
      username: "janesmith",
      password: "password456",
      role: "team_manager",
      team: "Team A"
    },
    {
      name: "Emily Johnson",
      username: "emilyjohnson",
      password: "password789",
      role: "member",
      team: "Team A"
    },
    {
      name: "Michael Brown",
      username: "michaelbrown",
      password: "password012",
      role: "team_manager",
      team: "Team B"
    },
    {
      name: "Sophia Davis",
      username: "sophiadavis",
      password: "password345",
      role: "member",
      team: "Team C"
    },
    {
      name: "William White",
      username: "williamwhite",
      password: "password678",
      role: "team_manager",
      team: "Team D"
    },
    {
      name: "Olivia Miller",
      username: "oliviamiller",
      password: "password901",
      role: "admin"
    },
    {
      name: "Mia Harris",
      username: "miaharris",
      password: "password234",
      role: "team_manager",
      team: "Team E"
    },
    {
      name: "Alexander Brooks",
      username: "alexanderbrooks",
      password: "password567",
      role: "member",
      team: "Team E"
    },
    {
      name: "Elijah Walker",
      username: "elijahwalker",
      password: "password1234",
      role: "admin"
    },
    {
      name: "Ava Jackson",
      username: "avajackson",
      password: "password5678",
      role: "team_manager",
      team: "Team F"
    },
    {
      name: "Liam Martin",
      username: "liammartin",
      password: "password9012",
      role: "member",
      team: "Team G"
    },
    {
      name: "Charlotte Lee",
      username: "charlottellee",
      password: "password3456",
      role: "team_manager",
      team: "Team H"
    },
    {
      name: "Benjamin Thompson",
      username: "benjaminthompson",
      password: "password7890",
      role: "admin"
    },
    {
      name: "Abigail Davis",
      username: "abbydavis",
      password: "password5679",
      role: "member",
      team: "Team G"
    },
    {
      name: "Ethan White",
      username: "ethanwhite",
      password: "password9013",
      role: "member",
      team: "Team G"
    },
    {
      name: "Daniel Green",
      username: "danielgreen",
      password: "password1235",
      role: "team_manager",
      team: "Team C"
    },
    {
      name: "Emma Wilson",
      username: "emmawilson",
      password: "password6789",
      role: "member",
      team: "Team C"
    },
    {
      name: "Noah Taylor",
      username: "noahtaylor",
      password: "password2345",
      role: "team_manager",
      team: "Team G"
    },
    {
      name: "Isabella Moore",
      username: "isabellamoore",
      password: "password7891",
      role: "member",
      team: "Team F"
    },
    {
      name: "James Anderson",
      username: "jamesanderson",
      password: "password3457",
      role: "member",
      team: "Team H"
    }
  ]
};

export const mockTeams: Teams = {
  teams: {
    "Admin": {
      manager: "John Doe",
      member: "Olivia Miller, Elijah Walker, Benjamin Thompson"
    },
    "Team A": {
      manager: "Jane Smith",
      member: "Emily Johnson"
    },
    "Team B": {
      manager: "Michael Brown",
      member: ""
    },
    "Team C": {
      manager: "Daniel Green",
      member: "Sophia Davis, Emma Wilson"
    },
    "Team D": {
      manager: "William White",
      member: ""
    },
    "Team E": {
      manager: "Mia Harris",
      member: "Alexander Brooks"
    },
    "Team F": {
      manager: "Ava Jackson",
      member: "Isabella Moore"
    },
    "Team G": {
      manager: "Noah Taylor",
      member: "Liam Martin, Abigail Davis, Ethan White"
    },
    "Team H": {
      manager: "Charlotte Lee",
      member: "James Anderson"
    }
  }
};

export const mockWorkflows: Workflows = {
  workflows: [
    {
      id: "WF-001",
      name: "Workflow 1",
      location: "/storage/documents/Workflow 1",
      status: "In Progress",
      team_handling: "Team C",
      documents: "contract.pdf, specs.docx",
      assigned_user: "sophiadavis",
      team_manager: "danielgreen",
      assigned_date: "03-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Initial approval",
          documents_changed: "contract.pdf"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Format adjustments",
          documents_changed: "specs.docx"
        }
      ],
      next_teams: "Team D, Team E, Team F, Team G"
    },
    {
      id: "WF-002",
      name: "Workflow 2",
      location: "/storage/documents/Workflow 2",
      status: "Review",
      team_handling: "Team D",
      documents: "financials.xlsx, timeline.pptx",
      assigned_user: "williamwhite",
      team_manager: "williamwhite",
      assigned_date: "04-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Initial review",
          documents_changed: "financials.xlsx"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Data validation",
          documents_changed: "financials.xlsx"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "03-06-2025",
          comments: "Formatting fixes",
          documents_changed: "timeline.pptx"
        }
      ],
      next_teams: "Team E, Team F, Team G"
    },
    {
      id: "WF-003",
      name: "Workflow 3",
      location: "/storage/documents/Workflow 3",
      status: "In Progress",
      team_handling: "Team F",
      documents: "codebase.zip, tests.py",
      assigned_user: "isabellamoore",
      team_manager: "avajackson",
      assigned_date: "06-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Security review",
          documents_changed: "codebase.zip"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Approved logic",
          documents_changed: "tests.py"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "03-06-2025",
          comments: "Code cleanup",
          documents_changed: "codebase.zip"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "04-06-2025",
          comments: "Integration checks",
          documents_changed: "tests.py"
        },
        {
          team: "Team E",
          username: "alexanderbrooks",
          approved_by: "miaharris",
          approved_on: "05-06-2025",
          comments: "Performance approved",
          documents_changed: "codebase.zip"
        }
      ],
      next_teams: "Team G"
    },
    {
      id: "WF-004",
      name: "Workflow 4",
      location: "/storage/documents/Workflow 4",
      status: "Rejected",
      team_handling: "Admin",
      documents: "design.ai, content.pdf",
      assigned_user: "johndoe",
      team_manager: "johndoe",
      assigned_date: "05-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Concept approved",
          documents_changed: "design.ai"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Rejected layout",
          documents_changed: "design.ai"
        },
        {
          team: "Admin",
          username: "johndoe",
          approved_by: "johndoe",
          approved_on: "05-06-2025",
          comments: "Sent for redesign",
          documents_changed: "design.ai"
        }
      ],
      next_teams: "Team A"
    },
    {
      id: "WF-005",
      name: "Workflow 5",
      location: "/storage/documents/Workflow 5",
      status: "Review",
      team_handling: "Team E",
      documents: "budget.xlsx, schedule.pdf",
      assigned_user: "alexanderbrooks",
      team_manager: "miaharris",
      assigned_date: "05-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Initial numbers OK",
          documents_changed: "budget.xlsx"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Adjusted totals",
          documents_changed: "budget.xlsx"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "03-06-2025",
          comments: "Format finalized",
          documents_changed: "schedule.pdf"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "04-06-2025",
          comments: "Timeline verified",
          documents_changed: "schedule.pdf"
        }
      ],
      next_teams: "Team F, Team G"
    },
    {
      id: "WF-006",
      name: "Workflow 6",
      location: "/storage/documents/Workflow 6",
      status: "Complete",
      team_handling: "Team G",
      documents: "final_report.pdf",
      assigned_user: "noahtaylor",
      team_manager: "noahtaylor",
      assigned_date: "07-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Draft approved",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Data verified",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "03-06-2025",
          comments: "Formatting done",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "04-06-2025",
          comments: "Legal check",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team E",
          username: "alexanderbrooks",
          approved_by: "miaharris",
          approved_on: "05-06-2025",
          comments: "Final numbers OK",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team F",
          username: "isabellamoore",
          approved_by: "avajackson",
          approved_on: "06-06-2025",
          comments: "Approved for release",
          documents_changed: "final_report.pdf"
        },
        {
          team: "Team G",
          username: "noahtaylor",
          approved_by: "noahtaylor",
          approved_on: "07-06-2025",
          comments: "Publication confirmed",
          documents_changed: "final_report.pdf"
        }
      ],
      next_teams: ""
    },
    {
      id: "WF-007",
      name: "Workflow 7",
      location: "/storage/documents/Workflow 7",
      status: "Rejected",
      team_handling: "Admin",
      documents: "prototype.fig, notes.txt",
      assigned_user: "johndoe",
      team_manager: "johndoe",
      assigned_date: "03-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Concept approved",
          documents_changed: "prototype.fig"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Rejected - incomplete",
          documents_changed: "prototype.fig"
        },
        {
          team: "Admin",
          username: "johndoe",
          approved_by: "johndoe",
          approved_on: "03-06-2025",
          comments: "Returned for revisions",
          documents_changed: "prototype.fig"
        }
      ],
      next_teams: ""
    },
    {
      id: "WF-008",
      name: "Workflow 8",
      location: "/storage/documents/Workflow 8",
      status: "Review",
      team_handling: "Team E",
      documents: "policy.md, guidelines.pdf",
      assigned_user: "alexanderbrooks",
      team_manager: "miaharris",
      assigned_date: "05-06-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "01-06-2025",
          comments: "Initial draft OK",
          documents_changed: "policy.md"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "02-06-2025",
          comments: "Legal adjustments",
          documents_changed: "policy.md"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "03-06-2025",
          comments: "Formatting complete",
          documents_changed: "guidelines.pdf"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "04-06-2025",
          comments: "Compliance check",
          documents_changed: "guidelines.pdf"
        }
      ],
      next_teams: "Team F, Team G"
    }
  ]
};
