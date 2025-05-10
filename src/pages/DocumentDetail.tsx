
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  TabsContent, 
  TabsList, 
  TabsTrigger, 
  Tabs 
} from '@/components/ui/tabs';
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Clock, 
  CheckCircle2, 
  XCircle,
  User
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkflowById, updateWorkflowStatus, approveWorkflow, rejectWorkflow } = useWorkflow();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('In Progress');
  const [approveComment, setApproveComment] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  
  const workflow = id ? getWorkflowById(id) : undefined;
  
  if (!workflow) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold mb-2">Document not found</h1>
        <p className="text-muted-foreground mb-4">The document you are looking for does not exist.</p>
        <Button onClick={() => navigate('/documents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
      </div>
    );
  }

  const handleUpdateStatus = () => {
    if (newStatus && comment) {
      updateWorkflowStatus(workflow.id, newStatus as any, comment);
      setComment('');
      setNewStatus('In Progress');
    }
  };

  const handleApproveWorkflow = () => {
    if (approveComment) {
      approveWorkflow(workflow.id, approveComment);
      setApproveComment('');
      setIsApproveDialogOpen(false);
    }
  };

  const handleRejectWorkflow = () => {
    if (rejectComment) {
      rejectWorkflow(workflow.id, rejectComment);
      setRejectComment('');
      setIsRejectDialogOpen(false);
    }
  };

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

  // Check if current user can edit this document
  const canEdit = currentUser?.role === 'admin' || 
                  (currentUser?.team === workflow.team_handling && 
                   (currentUser?.role === 'team_manager' || 
                    currentUser?.username === workflow.assigned_user));
  
  // Check if current user can approve this document
  const canApprove = currentUser?.role === 'admin' || 
                    (currentUser?.team === workflow.team_handling && 
                     currentUser?.role === 'team_manager');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/documents')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{workflow.name}</h1>
            <div className="flex items-center mt-1">
              <p className="text-muted-foreground mr-2">{workflow.id}</p>
              <Badge className={getStatusColor(workflow.status)}>
                {workflow.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Document Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">File Name</h3>
                      <p>{workflow.file_name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{workflow.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Current Team</h3>
                      <p>{workflow.team_handling}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Assigned User</h3>
                      <p>{workflow.assigned_user || 'Unassigned'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Assigned Date</h3>
                      <p>{workflow.assigned_date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Team Manager</h3>
                      <p>{workflow.team_manager}</p>
                    </div>
                  </div>
                  
                  {canEdit && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-sm font-medium mb-2">Update Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="md:col-span-1">
                            <Select value={newStatus} onValueChange={setNewStatus}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select new status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Review">Review</SelectItem>
                                {currentUser?.role === 'admin' && (
                                  <>
                                    <SelectItem value="Complete">Complete</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2">
                            <Textarea 
                              placeholder="Add a comment..." 
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button onClick={handleUpdateStatus} disabled={!comment}>
                          Update Status
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {canApprove && workflow.status !== 'Complete' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-status-complete hover:bg-status-complete/80">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve & Move to Next Stage
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Approve Document</DialogTitle>
                        <DialogDescription>
                          This will approve the document and move it to the next team in the workflow.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="approval-comment">Approval Comment</Label>
                          <Textarea 
                            id="approval-comment"
                            placeholder="Enter your comments..."
                            value={approveComment}
                            onChange={(e) => setApproveComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleApproveWorkflow}
                          disabled={!approveComment}
                          className="bg-status-complete hover:bg-status-complete/80"
                        >
                          Approve
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="flex-1 text-status-rejected border-status-rejected hover:bg-status-rejected/10"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Document</DialogTitle>
                        <DialogDescription>
                          This will reject the document and send it back to the beginning of the workflow.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rejection-comment">Rejection Reason</Label>
                          <Textarea 
                            id="rejection-comment"
                            placeholder="Enter your rejection reason..."
                            value={rejectComment}
                            onChange={(e) => setRejectComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleRejectWorkflow}
                          disabled={!rejectComment}
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow History</CardTitle>
                  <CardDescription>
                    Complete history of this document's workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {workflow.workflow_history.map((history, index) => (
                      <div key={index} className="relative pl-6 pb-8">
                        {index < workflow.workflow_history.length - 1 && (
                          <div className="absolute top-5 bottom-0 left-2 border-l-2 border-slate-200"></div>
                        )}
                        <div className="absolute left-0 top-1.5 rounded-full bg-slate-200 p-1">
                          {history.approved_by ? 
                            <CheckCircle2 className="h-3 w-3 text-status-complete" /> : 
                            <Clock className="h-3 w-3 text-status-in-progress" />
                          }
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {history.team}
                            </Badge>
                            {history.approved_by && (
                              <Badge className="bg-status-complete">Approved</Badge>
                            )}
                          </div>
                          <p className="mt-2 text-sm">{history.comments}</p>
                          <div className="mt-1 flex items-center text-xs text-muted-foreground">
                            <User className="mr-1 h-3 w-3" />
                            <span>{history.username || 'Unassigned'}</span>
                            {history.approved_by && (
                              <>
                                <span className="mx-1">•</span>
                                <span>Approved by: {history.approved_by}</span>
                              </>
                            )}
                            {history.approved_on && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{history.approved_on}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] bg-slate-50 rounded-md">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-sm text-center text-muted-foreground">
                {workflow.file_name}
              </p>
              <Button variant="outline" className="mt-4 flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
