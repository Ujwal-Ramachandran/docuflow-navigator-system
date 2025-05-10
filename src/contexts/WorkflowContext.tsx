
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
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const TEAM_SEQUENCE = ["Design Team", "Review Team", "Approval Team"];

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
          // Create a new history item
          const newHistoryItem: WorkflowHistoryItem = {
            team: workflow.team_handling,
            username: currentUser.username,
            approved_by: "",
            approved_on: "",
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
          const currentTeamIndex = TEAM_SEQUENCE.indexOf(workflow.team_handling);
          
          // Check if this is the last team
          if (currentTeamIndex === TEAM_SEQUENCE.length - 1) {
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
              workflow_history: [...workflow.workflow_history, newHistoryItem]
            };
          } else {
            // Move to the next team
            const nextTeam = TEAM_SEQUENCE[currentTeamIndex + 1];
            
            // Create a new history item for the completed team
            const newHistoryItem: WorkflowHistoryItem = {
              team: workflow.team_handling,
              username: currentUser.username,
              approved_by: currentUser.username,
              approved_on: new Date().toLocaleDateString('en-GB'),
              comments: comment
            };

            // Create an initial history item for the next team
            const nextTeamHistoryItem: WorkflowHistoryItem = {
              team: nextTeam,
              username: "", // Will be assigned later
              approved_by: "",
              approved_on: "",
              comments: "Awaiting action"
            };

            return {
              ...workflow,
              team_handling: nextTeam,
              status: 'In Progress',
              assigned_user: "", // Will be assigned by the next team's manager
              assigned_date: new Date().toLocaleDateString('en-GB'),
              workflow_history: [...workflow.workflow_history, newHistoryItem, nextTeamHistoryItem]
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
    if (!currentUser || currentUser.role !== 'team_manager') return;
    
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
          
          // Reset to the first team
          const firstTeam = TEAM_SEQUENCE[0];
          
          return {
            ...workflow,
            team_handling: firstTeam,
            status: 'Rejected',
            workflow_history: [...workflow.workflow_history, newHistoryItem]
          };
        }
        return workflow;
      })
    );
    
    toast({
      variant: 'destructive',
      title: 'Workflow Rejected',
      description: `The document has been rejected and returned to the beginning of the workflow.`,
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
      rejectWorkflow
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
