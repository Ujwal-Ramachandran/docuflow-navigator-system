
import React, { useState } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_TEAMS = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F", "Team G", "Team H"];

export const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { createNewWorkflow } = useWorkflow();
  const [workflowName, setWorkflowName] = useState('');
  const [documents, setDocuments] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>(DEFAULT_TEAMS);
  const [useCustomTeams, setUseCustomTeams] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workflowName.trim() || !documents.trim()) {
      return;
    }

    const teamsToUse = useCustomTeams ? selectedTeams : DEFAULT_TEAMS;
    createNewWorkflow(workflowName, documents, teamsToUse);
    
    // Reset form
    setWorkflowName('');
    setDocuments('');
    setSelectedTeams(DEFAULT_TEAMS);
    setUseCustomTeams(false);
    onClose();
  };

  const handleTeamToggle = (team: string) => {
    setSelectedTeams(prev => 
      prev.includes(team) 
        ? prev.filter(t => t !== team)
        : [...prev, team].sort()
    );
  };

  const handleCustomTeamsChange = (checked: boolean | "indeterminate") => {
    setUseCustomTeams(checked === true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Create a new document workflow. By default, documents will go through all teams sequentially.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input
              id="workflow-name"
              placeholder="Enter workflow name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="documents">Documents</Label>
            <Textarea
              id="documents"
              placeholder="Enter document names (e.g., contract.pdf, specs.docx)"
              value={documents}
              onChange={(e) => setDocuments(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="custom-teams"
                checked={useCustomTeams}
                onCheckedChange={handleCustomTeamsChange}
              />
              <Label htmlFor="custom-teams">
                Customize team sequence (default: all teams)
              </Label>
            </div>

            {useCustomTeams && (
              <div className="grid grid-cols-2 gap-2 p-4 border rounded-lg">
                <Label className="col-span-2 text-sm font-medium">
                  Select teams for this workflow:
                </Label>
                {DEFAULT_TEAMS.map((team) => (
                  <div key={team} className="flex items-center space-x-2">
                    <Checkbox
                      id={`team-${team}`}
                      checked={selectedTeams.includes(team)}
                      onCheckedChange={() => handleTeamToggle(team)}
                    />
                    <Label htmlFor={`team-${team}`} className="text-sm">
                      {team}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Workflow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
