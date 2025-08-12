import { Input } from "./ui/input";

export const NumberSettingsOption = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (newval: number) => void;
}) => {
  return (
    <span className="flex flex-row justify-between">
      {name}
      <Input
        className="  min-w-0  w-17 "
        type="number"
        value={value}
        onChange={(val) => onChange(Number.parseInt(val.target.value))}
      />
    </span>
  );
};
