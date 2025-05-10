
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage system configuration and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Configure email notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notify-document-assigned">Document assigned</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when document is assigned to user
                </p>
              </div>
              <Switch id="notify-document-assigned" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notify-document-status">Status changes</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when document status changes
                </p>
              </div>
              <Switch id="notify-document-status" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notify-document-rejected">Rejected documents</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when document is rejected
                </p>
              </div>
              <Switch id="notify-document-rejected" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Workflow Configuration</CardTitle>
            <CardDescription>
              Configure workflow default settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-team">Default initial team</Label>
              <Select defaultValue="Design Team">
                <SelectTrigger id="default-team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Design Team">Design Team</SelectItem>
                  <SelectItem value="Review Team">Review Team</SelectItem>
                  <SelectItem value="Approval Team">Approval Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workflow-prefix">Workflow ID prefix</Label>
              <Input id="workflow-prefix" defaultValue="WF-" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-notifications">Auto notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically notify next team when workflow advances
                </p>
              </div>
              <Switch id="auto-notifications" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
