
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
      file_name: "doc_review_3.pdf",
      assigned_user: "sophiadavis",
      team_manager: "danielgreen",
      assigned_date: "22-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "20-03-2025",
          comments: "Changed date"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "22-03-2025",
          comments: "Approved"
        }
      ]
    },
    {
      id: "WF-002",
      name: "Workflow 2",
      location: "/storage/documents/Workflow 2",
      status: "Review",
      team_handling: "Team D",
      file_name: "doc_review_4.pdf",
      assigned_user: "williamwhite",
      team_manager: "williamwhite",
      assigned_date: "23-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "21-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "22-03-2025",
          comments: "Approved with minor changes"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "23-03-2025",
          comments: "Changes implemented"
        }
      ]
    },
    {
      id: "WF-003",
      name: "Workflow 3",
      location: "/storage/documents/Workflow 3",
      status: "Complete",
      team_handling: "Team G",
      file_name: "doc_review_5.pdf",
      assigned_user: "liammartin",
      team_manager: "noahtaylor",
      assigned_date: "24-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "20-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "21-03-2025",
          comments: "Approved"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "22-03-2025",
          comments: "Changes implemented"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "23-03-2025",
          comments: "Approved"
        },
        {
          team: "Team E",
          username: "alexanderbrooks",
          approved_by: "miaharris",
          approved_on: "24-03-2025",
          comments: "Final review completed"
        },
        {
          team: "Team F",
          username: "isabellamoore",
          approved_by: "avajackson",
          approved_on: "25-03-2025",
          comments: "Approved"
        },
        {
          team: "Team G",
          username: "liammartin",
          approved_by: "noahtaylor",
          approved_on: "26-03-2025",
          comments: "Final approval"
        }
      ]
    },
    {
      id: "WF-004",
      name: "Workflow 4",
      location: "/storage/documents/Workflow 4",
      status: "Rejected",
      team_handling: "Team E",
      file_name: "doc_review_6.pdf",
      assigned_user: "alexanderbrooks",
      team_manager: "miaharris",
      assigned_date: "25-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "22-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "23-03-2025",
          comments: "Approved with minor changes"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "24-03-2025",
          comments: "Changes implemented"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "25-03-2025",
          comments: "Rejected due to errors"
        },
        {
          team: "Admin",
          username: "johndoe",
          approved_by: "johndoe",
          approved_on: "26-03-2025",
          comments: "Document rejected and sent back for revision"
        }
      ]
    },
    {
      id: "WF-005",
      name: "Workflow 5",
      location: "/storage/documents/Workflow 5",
      status: "Review",
      team_handling: "Team F",
      file_name: "doc_review_7.pdf",
      assigned_user: "isabellamoore",
      team_manager: "avajackson",
      assigned_date: "26-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "23-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "24-03-2025",
          comments: "Approved"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "25-03-2025",
          comments: "Changes implemented"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "26-03-2025",
          comments: "Under review"
        }
      ]
    },
    {
      id: "WF-006",
      name: "Workflow 6",
      location: "/storage/documents/Workflow 6",
      status: "Complete",
      team_handling: "Team H",
      file_name: "doc_review_8.pdf",
      assigned_user: "jamesanderson",
      team_manager: "charlottellee",
      assigned_date: "27-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "24-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "25-03-2025",
          comments: "Approved"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "26-03-2025",
          comments: "Changes implemented"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "27-03-2025",
          comments: "Approved"
        },
        {
          team: "Team E",
          username: "alexanderbrooks",
          approved_by: "miaharris",
          approved_on: "28-03-2025",
          comments: "Final review completed"
        },
        {
          team: "Team F",
          username: "isabellamoore",
          approved_by: "avajackson",
          approved_on: "29-03-2025",
          comments: "Approved"
        },
        {
          team: "Team G",
          username: "liammartin",
          approved_by: "noahtaylor",
          approved_on: "30-03-2025",
          comments: "Final approval"
        },
        {
          team: "Team H",
          username: "jamesanderson",
          approved_by: "charlottellee",
          approved_on: "31-03-2025",
          comments: "Document completed"
        }
      ]
    },
    {
      id: "WF-007",
      name: "Workflow 7",
      location: "/storage/documents/Workflow 7",
      status: "Rejected",
      team_handling: "Team B",
      file_name: "doc_review_9.pdf",
      assigned_user: "michaelbrown",
      team_manager: "michaelbrown",
      assigned_date: "28-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "25-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by": "michaelbrown",
          approved_on: "26-03-2025",
          comments: "Rejected due to errors"
        },
        {
          team: "Admin",
          username: "johndoe",
          approved_by: "johndoe",
          approved_on: "27-03-2025",
          comments: "Document rejected and sent back for revision"
        }
      ]
    },
    {
      id: "WF-008",
      name: "Workflow 8",
      location: "/storage/documents/Workflow 8",
      status: "Review",
      team_handling: "Team G",
      file_name: "doc_review_10.pdf",
      assigned_user: "liammartin",
      team_manager: "noahtaylor",
      assigned_date: "29-03-2025",
      workflow_history: [
        {
          team: "Team A",
          username: "emilyjohnson",
          approved_by: "janesmith",
          approved_on: "26-03-2025",
          comments: "Initial review completed"
        },
        {
          team: "Team B",
          username: "michaelbrown",
          approved_by: "michaelbrown",
          approved_on: "27-03-2025",
          comments: "Approved"
        },
        {
          team: "Team C",
          username: "sophiadavis",
          approved_by: "danielgreen",
          approved_on: "28-03-2025",
          comments: "Changes implemented"
        },
        {
          team: "Team D",
          username: "williamwhite",
          approved_by: "williamwhite",
          approved_on: "29-03-2025",
          comments: "Under review"
        }
      ]
    }
  ]
};
