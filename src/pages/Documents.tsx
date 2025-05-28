
import React, { useState } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { FileText, Search, Plus } from 'lucide-react';
import { CreateWorkflowDialog } from '@/components/CreateWorkflowDialog';

const Documents = () => {
  const { workflows } = useWorkflow();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Filter workflows based on user role
  let filteredWorkflows = [...workflows];
  
  if (currentUser?.role === 'team_manager' && currentUser.team) {
    filteredWorkflows = filteredWorkflows.filter(w => w.team_handling === currentUser.team);
  } else if (currentUser?.role === 'member' && currentUser.username) {
    filteredWorkflows = filteredWorkflows.filter(w => w.assigned_user === currentUser.username);
  }
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredWorkflows = filteredWorkflows.filter(w => 
      w.name.toLowerCase().includes(term) || 
      w.id.toLowerCase().includes(term) ||
      w.documents.toLowerCase().includes(term)
    );
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredWorkflows = filteredWorkflows.filter(w => w.status === statusFilter);
  }
  
  // Apply team filter
  if (teamFilter !== 'all' && currentUser?.role === 'admin') {
    filteredWorkflows = filteredWorkflows.filter(w => w.team_handling === teamFilter);
  }
  
  // Get unique teams for filter
  const uniqueTeams = [...new Set(workflows.map(w => w.team_handling))];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress':
        return 'bg-status-in-progress';
      case 'Review':
        return 'bg-status-review';
      case 'Complete':
        return 'bg-status-complete';
      case 'Rejected':
        return 'bg-status-rejected';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and track document workflows
          </p>
        </div>
        
        {currentUser?.role === 'admin' && (
          <Button className="flex items-center" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            {currentUser?.role === 'admin' && (
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {uniqueTeams.map(team => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {filteredWorkflows.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Assigned User</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkflows.map(workflow => (
                    <TableRow 
                      key={workflow.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/documents/${workflow.id}`)}
                    >
                      <TableCell className="font-medium">{workflow.id}</TableCell>
                      <TableCell className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {workflow.name}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{workflow.team_handling}</TableCell>
                      <TableCell className="max-w-xs truncate">{workflow.documents}</TableCell>
                      <TableCell>{workflow.assigned_user || 'Unassigned'}</TableCell>
                      <TableCell>{workflow.assigned_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No documents found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || teamFilter !== 'all' ? 
                  'Try changing your search or filter criteria' : 
                  'No documents are available in your workflow'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateWorkflowDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)} 
      />
    </div>
  );
};

export default Documents;
