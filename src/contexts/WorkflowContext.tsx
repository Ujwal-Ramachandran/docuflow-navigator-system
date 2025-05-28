
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Workflow, WorkflowHistoryItem, WorkflowStatus } from '../types';
import { mockWorkflows } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface WorkflowContextType {
  workflows: Workflow[];
  getWorkflowById: (id: string) => Workflow | undefined;
  updateWorkflowStatus: (workflowId: string, newStatus: WorkflowStatus, comment: string) => void;
  moveToNextTeam: (workflowId: string, comment: string) => void;
  filterWorkflowsByTeam: (team: string) => Workflow[];
  filterWorkflowsByUser: (username: string) => Workflow[];
  approveWorkflow: (workflowId: string, comment: string) => void;
  rejectWorkflow: (workflowId: string, comment: string) => void;
  assignWorkflowToUser: (workflowId: string, username: string) => void;
  createNewWorkflow: (name: string, documents: string, selectedTeams?: string[]) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

// Default team sequence - Admin can customize this when creating workflows
const DEFAULT_TEAM_SEQUENCE = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F", "Team G", "Team H"];

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows.workflows);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const getWorkflowById = (id: string): Workflow | undefined => {
    return workflows.find(workflow => workflow.id === id);
  };

  const updateWorkflowStatus = (workflowId: string, newStatus: WorkflowStatus, comment: string) => {
    if (!currentUser) return;

    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id === workflowId) {
          const newHistoryItem: WorkflowHistoryItem = {
            team: workflow.team_handling,
            username: currentUser.username,
            approved_by: currentUser.username,
            approved_on: new Date().toLocaleDateString('en-GB'),
            comments: comment
          };

          return {
            ...workflow,
            status: newStatus,
            workflow_history: [...workflow.workflow_history, newHistoryItem]
          };
        }
        return workflow;
      })
    );

    toast({
      title: 'Status Updated',
      description: `Workflow status has been updated to ${newStatus}`,
    });
  };

  const moveToNextTeam = (workflowId: string, comment: string) => {
    if (!currentUser) return;

    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id === workflowId) {
          const nextTeamsArray = workflow.next_teams.split(', ').filter(team => team.trim() !== '');
          
          // Check if this is the last team
          if (nextTeamsArray.length === 0) {
            // This is the final team, mark as complete
            const newHistoryItem: WorkflowHistoryItem = {
              team: workflow.team_handling,
              username: currentUser.username,
              approved_by: currentUser.username,
              approved_on: new Date().toLocaleDateString('en-GB'),
              comments: comment
            };

            return {
              ...workflow,
              status: 'Complete',
              workflow_history: [...workflow.workflow_history, newHistoryItem],
              next_teams: ""
            };
          } else {
            // Move to the next team
            const nextTeam = nextTeamsArray[0];
            const remainingTeams = nextTeamsArray.slice(1).join(', ');
            
            // Create a new history item for the completed team
            const newHistoryItem: WorkflowHistoryItem = {
              team: workflow.team_handling,
              username: currentUser.username,
              approved_by: currentUser.username,
              approved_on: new Date().toLocaleDateString('en-GB'),
              comments: comment
            };

            return {
              ...workflow,
              team_handling: nextTeam,
              status: 'In Progress',
              assigned_user: "", // Will be assigned by the next team's manager
              assigned_date: new Date().toLocaleDateString('en-GB'),
              workflow_history: [...workflow.workflow_history, newHistoryItem],
              next_teams: remainingTeams
            };
          }
        }
        return workflow;
      })
    );

    toast({
      title: 'Workflow Advanced',
      description: `The document has been moved to the next stage in the workflow.`,
    });
  };

  const filterWorkflowsByTeam = (team: string): Workflow[] => {
    return workflows.filter(workflow => workflow.team_handling === team);
  };

  const filterWorkflowsByUser = (username: string): Workflow[] => {
    return workflows.filter(workflow => workflow.assigned_user === username);
  };

  const approveWorkflow = (workflowId: string, comment: string) => {
    if (!currentUser) return;
    
    moveToNextTeam(workflowId, comment);
    
    toast({
      title: 'Workflow Approved',
      description: `You have approved the document to move to the next stage.`,
    });
  };
  
  const rejectWorkflow = (workflowId: string, comment: string) => {
    if (!currentUser) return;
    
    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id === workflowId) {
          // Create a new history item for the rejection
          const newHistoryItem: WorkflowHistoryItem = {
            team: workflow.team_handling,
            username: currentUser.username,
            approved_by: currentUser.username,
            approved_on: new Date().toLocaleDateString('en-GB'),
            comments: `REJECTED: ${comment}`
          };
          
          // Reset to Admin for review
          return {
            ...workflow,
            team_handling: "Admin",
            status: 'Rejected',
            assigned_user: "johndoe",
            team_manager: "johndoe",
            workflow_history: [...workflow.workflow_history, newHistoryItem],
            next_teams: "Team A, Team B, Team C, Team D, Team E, Team F, Team G, Team H"
          };
        }
        return workflow;
      })
    );
    
    toast({
      variant: 'destructive',
      title: 'Workflow Rejected',
      description: `The document has been rejected and sent to Admin for review.`,
    });
  };

  const assignWorkflowToUser = (workflowId: string, username: string) => {
    if (!currentUser || currentUser.role !== 'team_manager') return;

    setWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => {
        if (workflow.id === workflowId && workflow.team_handling === currentUser.team) {
          return {
            ...workflow,
            assigned_user: username,
            assigned_date: new Date().toLocaleDateString('en-GB')
          };
        }
        return workflow;
      })
    );

    toast({
      title: 'Workflow Assigned',
      description: `Workflow has been assigned to ${username}`,
    });
  };

  const createNewWorkflow = (name: string, documents: string, selectedTeams?: string[]) => {
    if (!currentUser || currentUser.role !== 'admin') return;

    const workflowId = `WF-${String(workflows.length + 1).padStart(3, '0')}`;
    const teamsSequence = selectedTeams && selectedTeams.length > 0 ? selectedTeams : DEFAULT_TEAM_SEQUENCE;
    const firstTeam = teamsSequence[0];
    const remainingTeams = teamsSequence.slice(1).join(', ');

    const newWorkflow: Workflow = {
      id: workflowId,
      name: name,
      location: `/storage/documents/${name}`,
      status: 'In Progress',
      team_handling: firstTeam,
      documents: documents,
      assigned_user: "",
      team_manager: "",
      assigned_date: new Date().toLocaleDateString('en-GB'),
      workflow_history: [],
      next_teams: remainingTeams
    };

    setWorkflows(prevWorkflows => [...prevWorkflows, newWorkflow]);

    toast({
      title: 'New Workflow Created',
      description: `${name} has been created and assigned to ${firstTeam}`,
    });
  };
  
  return (
    <WorkflowContext.Provider value={{ 
      workflows, 
      getWorkflowById, 
      updateWorkflowStatus, 
      moveToNextTeam,
      filterWorkflowsByTeam,
      filterWorkflowsByUser,
      approveWorkflow,
      rejectWorkflow,
      assignWorkflowToUser,
      createNewWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
