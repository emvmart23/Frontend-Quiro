import { useQuery } from "react-query";
import { Check, ChevronsUpDown, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils/tools";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useEffect, useState } from "react";
import { getAttendance } from "@/helpers/getAttendance";
import { getBoxes } from "@/helpers/getBoxes";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface Props {
  value: number;
  setValue: (value: number) => void;
}

export default function SearchHostess({ value, setValue }: Props) {
  const [allBoxes, setBoxes] = useState<Box[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useQuery("Attendance", getAttendance);
  const [open, setOpen] = useState(false);

  const lastId = allBoxes.reduceRight(
    (maxId, box) => Math.max(maxId, box.id),
    0
  );

  const lastBox = allBoxes.find((box) => box.id === lastId);

  const hostess = (data ? data.attendances : [])?.filter(
    ({ box_date, box_state, role_user, present }: Attendace) =>
      box_state === 1 &&
      box_date === lastBox?.opening &&
      (role_user === 4 || role_user === 8) &&
      Number(present) === 1
  );

  const filteredHostess = hostess?.filter((attendant: Attendace) =>
    attendant.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchBox = async () => {
    const { boxes } = await getBoxes();
    setBoxes(boxes);
  };

  useEffect(() => {
    fetchBox();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8 md:h-10"
        >
          {value
            ? hostess?.find(({ user_id }: Attendace) => user_id == value)?.user
            : "Seleccionar anfitriona..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput 
            placeholder="Buscar anfitrionas..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>Anfitriona no encontrada</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-auto max-h-32">
                {filteredHostess?.length > 0 ? (
                  filteredHostess?.map(({ id, user_id, user }: Attendace) => (
                    <CommandItem
                      key={id}
                      value={user}
                      onSelect={() => {
                        setValue(user_id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === user_id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem className="text-[0.7rem] font-semibold">
                    <CircleAlert className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    No hay anfitrionas, primero toma asistencia
                  </CommandItem>
                )}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
