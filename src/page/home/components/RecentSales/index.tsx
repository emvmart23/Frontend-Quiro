import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { UserCheck } from "lucide-react";

interface Props {
  pendingOrders: Header[];
}

export function RecentSales({ pendingOrders }: Props) {
  const lastFiveOrders = pendingOrders.slice(
    Math.max(pendingOrders.length - 5)
  );
  
  return (
    <div className="space-y-8">
      {lastFiveOrders.map((head) => {
        const order = head.orders.find((o) => o);
        return (
          <div key={head.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>
                <UserCheck />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{head.mozo}</p>
              <p className="text-sm text-muted-foreground">
                {order?.name}
              </p>
            </div>
            <div className="ml-auto font-medium">{order?.total_price}</div>
          </div>
        );
      })}
    </div>
  );
}
