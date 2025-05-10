
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Check, 
  AlertCircle, 
  Clock,
  Hourglass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusIconMap = {
  'In Progress': <Clock className="h-5 w-5" />,
  'Review': <Hourglass className="h-5 w-5" />,
  'Complete': <Check className="h-5 w-5" />,
  'Rejected': <AlertCircle className="h-5 w-5" />
};

const statusColorMap = {
  'In Progress': 'bg-status-in-progress',
  'Review': 'bg-status-review',
  'Complete': 'bg-status-complete',
  'Rejected': 'bg-status-rejected'
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { workflows, filterWorkflowsByTeam, filterWorkflowsByUser } = useWorkflow();
  const navigate = useNavigate();
  
  let filteredWorkflows = workflows;
  
  // Filter workflows based on user role
  if (currentUser?.role === 'team_manager' && currentUser.team) {
    filteredWorkflows = filterWorkflowsByTeam(currentUser.team);
  } else if (currentUser?.role === 'member' && currentUser.team) {
    filteredWorkflows = filterWorkflowsByUser(currentUser.username);
  }

  // Count workflows by status
  const statusCounts = {
    'In Progress': filteredWorkflows.filter(w => w.status === 'In Progress').length,
    'Review': filteredWorkflows.filter(w => w.status === 'Review').length,
    'Complete': filteredWorkflows.filter(w => w.status === 'Complete').length,
    'Rejected': filteredWorkflows.filter(w => w.status === 'Rejected').length
  };

  const recentWorkflows = [...filteredWorkflows]
    .sort((a, b) => new Date(b.assigned_date.split('-').reverse().join('-')).getTime() 
      - new Date(a.assigned_date.split('-').reverse().join('-')).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {currentUser?.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <div className={`rounded-full p-1 ${statusColorMap['In Progress']} text-white`}>
              {statusIconMap['In Progress']}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts['In Progress']}</div>
            <p className="text-xs text-muted-foreground">
              Documents being worked on
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <div className={`rounded-full p-1 ${statusColorMap['Review']} text-white`}>
              {statusIconMap['Review']}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts['Review']}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review or approval
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className={`rounded-full p-1 ${statusColorMap['Complete']} text-white`}>
              {statusIconMap['Complete']}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts['Complete']}</div>
            <p className="text-xs text-muted-foreground">
              Finalized documents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <div className={`rounded-full p-1 ${statusColorMap['Rejected']} text-white`}>
              {statusIconMap['Rejected']}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts['Rejected']}</div>
            <p className="text-xs text-muted-foreground">
              Returned for revisions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            Latest documents in your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorkflows.length > 0 ? (
              recentWorkflows.map(workflow => (
                <div 
                  key={workflow.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer"
                  onClick={() => navigate(`/documents/${workflow.id}`)}
                >
                  <div className="flex items-center">
                    <div className="mr-4 bg-slate-100 p-2 rounded">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{workflow.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {workflow.id} • {workflow.team_handling}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge 
                      className={`${workflow.status === 'In Progress' ? 'bg-status-in-progress' : 
                        workflow.status === 'Review' ? 'bg-status-review' : 
                        workflow.status === 'Complete' ? 'bg-status-complete' : 
                        'bg-status-rejected'}`}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No documents available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
