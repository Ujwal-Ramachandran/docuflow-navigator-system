
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { mockTeams } from '@/data/mockData';
import { TeamMember } from '@/types';

const Teams = () => {
  const teams = mockTeams.teams;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground">
          Manage teams and their members
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(teams).map(([teamName, teamData]) => (
          <Card key={teamName}>
            <CardHeader>
              <CardTitle>{teamName}</CardTitle>
              <CardDescription>
                Team workflow group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manager</p>
                  <p className="font-medium">{teamData.manager}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Members</p>
                  <p>{teamData.member}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
