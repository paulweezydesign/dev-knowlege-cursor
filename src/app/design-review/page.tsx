import {
  CheckCircle2,
  CircleAlert,
  Filter,
  MessageSquare,
} from "lucide-react";

import { DesignMock } from "@/components/design-mock";
import { PageHeader } from "@/components/page-header";
import { ApprovalStatusBadge } from "@/components/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { designReviews, projectById } from "@/lib/data";
import { formatDate, initials } from "@/lib/format";

export default function DesignReviewPage() {
  const featured = designReviews[0];
  const others = designReviews.slice(1);
  const featuredProject = projectById(featured.projectId);
  const featuredPins = featured.comments
    .filter((c) => c.pinX != null && c.pinY != null)
    .map((c, i) => ({ x: c.pinX!, y: c.pinY!, index: i + 1 }));

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Design"
        title="Design review"
        description="Native Figma-style approvals with annotated feedback and version history."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>
            <Button size="sm">Request review</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {featuredProject?.name}
              </span>
              <CardTitle className="text-base">{featured.title}</CardTitle>
              <span className="text-xs text-muted-foreground">
                Version {featured.version} · Due {formatDate(featured.dueDate)}{" "}
                · {featured.reviewers.join(", ")}
              </span>
            </div>
            <ApprovalStatusBadge status={featured.status} />
          </CardHeader>
          <CardContent>
            <DesignMock
              variant={featured.thumbnail}
              showPins={featuredPins}
              className="shadow-sm"
            />
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquare className="size-3.5" />
                {featured.comments.filter((c) => !c.resolved).length} open ·{" "}
                {featured.comments.filter((c) => c.resolved).length} resolved
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <CircleAlert className="size-4" />
                  Request changes
                </Button>
                <Button size="sm">
                  <CheckCircle2 className="size-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversation</CardTitle>
            <p className="text-xs text-muted-foreground">
              Threaded feedback, pinned to the canvas where relevant.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {featured.comments.map((comment, i) => {
              const pinIndex = comment.pinX != null ? i + 1 : null;
              return (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] text-white">
                      {initials(comment.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">
                          {comment.author}
                        </span>
                        {pinIndex && (
                          <Badge
                            variant="outline"
                            className="border-fuchsia-500/40 bg-fuchsia-500/10 px-1.5 py-0 text-[10px] text-fuchsia-700 dark:text-fuchsia-300"
                          >
                            Pin {pinIndex}
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="rounded-md bg-muted/40 px-3 py-2 text-sm leading-relaxed">
                      {comment.message}
                    </p>
                  </div>
                </div>
              );
            })}

            <Separator />

            <div className="flex flex-col gap-2 rounded-md border border-border/70 bg-card p-3">
              <textarea
                className="min-h-16 resize-none border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Add a comment, @mention a teammate, or attach a file…"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  Markdown supported
                </span>
                <Button size="sm" disabled>
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-tight">
          More awaiting review
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {others.map((review) => {
            const project = projectById(review.projectId);
            const pins = review.comments
              .filter((c) => c.pinX != null && c.pinY != null)
              .map((c, i) => ({ x: c.pinX!, y: c.pinY!, index: i + 1 }));
            return (
              <Card key={review.id}>
                <CardContent className="flex flex-col gap-3 p-4">
                  <DesignMock
                    variant={review.thumbnail}
                    showPins={pins}
                    className="shadow-sm"
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5 leading-tight">
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {project?.name}
                      </span>
                      <span className="text-sm font-medium">{review.title}</span>
                    </div>
                    <ApprovalStatusBadge status={review.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{review.version}</span>
                    <span>Due {formatDate(review.dueDate)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
