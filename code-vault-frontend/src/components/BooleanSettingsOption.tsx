import { Switch } from "./ui/switch";

export const BooleanSettingsOption = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: boolean;
  onChange: (newval: boolean) => void;
}) => {
  return (
    <span className="flex flex-row justify-between">
      {name}
      <Switch checked={value} onCheckedChange={(val) => onChange(val)} />
    </span>
  );
};
