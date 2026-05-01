"use client"

import { useState } from "react"
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Eye,
  Pen,
  FileText,
  Image,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { designReviews } from "@/lib/mock-data"

const statusConfig = {
  pending: { label: "Pending", style: "bg-slate-500/10 text-slate-700", icon: Clock },
  "in-review": { label: "In Review", style: "bg-blue-500/10 text-blue-700", icon: Eye },
  approved: { label: "Approved", style: "bg-emerald-500/10 text-emerald-700", icon: CheckCircle2 },
  "changes-requested": { label: "Changes Requested", style: "bg-amber-500/10 text-amber-700", icon: MessageSquare },
  rejected: { label: "Rejected", style: "bg-red-500/10 text-red-700", icon: XCircle },
} as const

const typeIcons = {
  figma: Pen,
  pdf: FileText,
  image: Image,
} as const

function ReviewCard({ review }: { review: (typeof designReviews)[number] }) {
  const config = statusConfig[review.status]
  const StatusIcon = config.icon
  const TypeIcon = typeIcons[review.type]
  const isOverdue = new Date(review.dueDate) < new Date() && review.status !== "approved"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-md bg-muted">
              <TypeIcon className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                {review.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                v{review.version} · {review.project}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className={config.style}>
            <StatusIcon className="mr-1 size-3" />
            {config.label}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Reviewer:</span>
            <div className="flex items-center gap-1">
              <Avatar className="size-5">
                <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                  {review.reviewer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{review.reviewer}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Submitted {review.submittedAt}
          </span>
          <span className={isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}>
            {isOverdue ? "Overdue" : `Due ${review.dueDate}`}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {review.status === "pending" && (
            <Button size="sm" className="flex-1">
              Start Review
            </Button>
          )}
          {review.status === "in-review" && (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                Request Changes
              </Button>
              <Button size="sm" className="flex-1">
                Approve
              </Button>
            </>
          )}
          {review.status === "changes-requested" && (
            <Button size="sm" variant="outline" className="flex-1">
              View Feedback
            </Button>
          )}
          {review.status === "approved" && (
            <Button size="sm" variant="ghost" className="flex-1">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReviewsPage() {
  const [search, setSearch] = useState("")

  const filtered = designReviews.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase())
  )

  const byStatus = (status: string) =>
    filtered.filter((r) => r.status === status)

  const pendingCount = byStatus("pending").length + byStatus("in-review").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Design Reviews</h2>
          <p className="text-muted-foreground">
            Manage design approvals and client feedback workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">
              {pendingCount} awaiting review
            </Badge>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {(
          [
            ["pending", "Pending"],
            ["in-review", "In Review"],
            ["changes-requested", "Changes Req."],
            ["approved", "Approved"],
          ] as const
        ).map(([status, label]) => {
          const config = statusConfig[status]
          const Icon = config.icon
          return (
            <Card key={status}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {designReviews.filter((r) => r.status === status).length}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          <TabsTrigger value="action">
            Needs Action ({byStatus("pending").length + byStatus("in-review").length})
          </TabsTrigger>
          <TabsTrigger value="changes">
            Changes ({byStatus("changes-requested").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({byStatus("approved").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="action" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered
              .filter((r) => r.status === "pending" || r.status === "in-review")
              .map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="changes" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {byStatus("changes-requested").map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {byStatus("approved").map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
