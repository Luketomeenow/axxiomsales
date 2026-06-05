import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface CalSchedulerProps {
  dealId: string;
  contactId?: string;
  companyId?: string;
}

export function CalScheduler({ dealId, contactId, companyId }: CalSchedulerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "45-strategy-call" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
      });
    })();
  }, []);

  return (
    <Card className="bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] overflow-hidden">
      <CardHeader className="bg-[hsl(0,0%,12%)] border-b border-[hsl(0,0%,18%)] py-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[hsl(40,50%,55%)]" />
          <CardTitle className="text-base font-semibold text-[hsl(40,20%,90%)]" style={{ fontFamily: "Cinzel, serif" }}>
            Schedule Meeting
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 bg-[hsl(0,0%,8%)]">
        <div style={{ height: "700px", overflow: "auto" }}>
          <Cal
            namespace="45-strategy-call"
            calLink="stafflyai/45-strategy-call"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
