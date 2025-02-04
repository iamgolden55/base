"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const projects = [
  {
    id: 1,
    title: "Gene Expression Analysis",
    description: "Analysis of gene expression patterns in cancer cells",
    status: "In Progress",
    progress: 65,
    team: [
      { name: "Alice Johnson", image: "/avatars/01.png" },
      { name: "Bob Smith", image: "/avatars/02.png" },
      { name: "Carol White", image: "/avatars/03.png" },
    ],
    deadline: "2024-03-15",
  },
  {
    id: 2,
    title: "Drug Discovery Platform",
    description: "Development of AI-powered drug discovery platform",
    status: "Planning",
    progress: 25,
    team: [
      { name: "David Brown", image: "/avatars/04.png" },
      { name: "Eva Green", image: "/avatars/05.png" },
    ],
    deadline: "2024-04-30",
  },
  {
    id: 3,
    title: "Clinical Trial Analysis",
    description: "Statistical analysis of phase III clinical trial data",
    status: "Review",
    progress: 90,
    team: [
      { name: "Frank Miller", image: "/avatars/06.png" },
      { name: "Grace Lee", image: "/avatars/07.png" },
      { name: "Henry Wilson", image: "/avatars/08.png" },
    ],
    deadline: "2024-02-28",
  },
  // Add more projects as needed
]

export function ProjectGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <Badge variant={
                project.status === "In Progress" ? "default" :
                project.status === "Planning" ? "secondary" :
                "outline"
              }>
                {project.status}
              </Badge>
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Team</span>
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">View Details</Button>
            <div className="text-sm text-muted-foreground">
              Due: {new Date(project.deadline).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 