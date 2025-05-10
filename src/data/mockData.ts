
import { Users, Teams, Workflows } from '../types';

export const mockUsers: Users = {
  users: [
    {
      name: "Admin User",
      username: "admin",
      password: "admin123",
      role: "admin"
    },
    {
      name: "Design Manager",
      username: "design_manager",
      password: "manager123",
      role: "team_manager",
      team: "Design Team"
    },
    {
      name: "Review Manager",
      username: "review_manager",
      password: "manager123",
      role: "team_manager",
      team: "Review Team"
    },
    {
      name: "Approval Manager",
      username: "approval_manager",
      password: "manager123",
      role: "team_manager",
      team: "Approval Team"
    },
    {
      name: "Design Member",
      username: "design_member",
      password: "member123",
      role: "member",
      team: "Design Team"
    },
    {
      name: "Review Member",
      username: "review_member",
      password: "member123",
      role: "member",
      team: "Review Team"
    },
    {
      name: "Approval Member",
      username: "approval_member",
      password: "member123",
      role: "member",
      team: "Approval Team"
    }
  ]
};

export const mockTeams: Teams = {
  teams: {
    "Design Team": {
      manager: "Design Manager",
      member: "Design Member"
    },
    "Review Team": {
      manager: "Review Manager",
      member: "Review Member"
    },
    "Approval Team": {
      manager: "Approval Manager",
      member: "Approval Member"
    }
  }
};

export const mockWorkflows: Workflows = {
  workflows: [
    {
      id: "WF-001",
      name: "Annual Report",
      location: "/documents/annual_report.pdf",
      status: "In Progress",
      team_handling: "Design Team",
      file_name: "annual_report_2023.pdf",
      assigned_user: "design_member",
      team_manager: "design_manager",
      assigned_date: "01-05-2023",
      workflow_history: [
        {
          team: "Design Team",
          username: "design_member",
          approved_by: "",
          approved_on: "",
          comments: "Initial document created"
        }
      ]
    },
    {
      id: "WF-002",
      name: "Marketing Brochure",
      location: "/documents/marketing_brochure.pdf",
      status: "Review",
      team_handling: "Review Team",
      file_name: "summer_campaign.pdf",
      assigned_user: "review_member",
      team_manager: "review_manager",
      assigned_date: "10-05-2023",
      workflow_history: [
        {
          team: "Design Team",
          username: "design_member",
          approved_by: "design_manager",
          approved_on: "05-05-2023",
          comments: "Design completed"
        },
        {
          team: "Review Team",
          username: "review_member",
          approved_by: "",
          approved_on: "",
          comments: "Under review"
        }
      ]
    },
    {
      id: "WF-003",
      name: "Client Contract",
      location: "/documents/client_contract.pdf",
      status: "Complete",
      team_handling: "Approval Team",
      file_name: "acme_corp_contract.pdf",
      assigned_user: "approval_member",
      team_manager: "approval_manager",
      assigned_date: "15-05-2023",
      workflow_history: [
        {
          team: "Design Team",
          username: "design_member",
          approved_by: "design_manager",
          approved_on: "12-05-2023",
          comments: "Contract drafted"
        },
        {
          team: "Review Team",
          username: "review_member",
          approved_by: "review_manager",
          approved_on: "14-05-2023",
          comments: "Legal review completed"
        },
        {
          team: "Approval Team",
          username: "approval_member",
          approved_by: "approval_manager",
          approved_on: "16-05-2023",
          comments: "Final approval granted"
        }
      ]
    },
    {
      id: "WF-004",
      name: "Product Specification",
      location: "/documents/product_spec.pdf",
      status: "Rejected",
      team_handling: "Design Team",
      file_name: "new_product_spec.pdf",
      assigned_user: "design_member",
      team_manager: "design_manager",
      assigned_date: "20-05-2023",
      workflow_history: [
        {
          team: "Design Team",
          username: "design_member",
          approved_by: "design_manager",
          approved_on: "22-05-2023",
          comments: "Initial specifications"
        },
        {
          team: "Review Team",
          username: "review_member",
          approved_by: "",
          approved_on: "",
          comments: "Missing crucial safety information. Rejected."
        }
      ]
    }
  ]
};
