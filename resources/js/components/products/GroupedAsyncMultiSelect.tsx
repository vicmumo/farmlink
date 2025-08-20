import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
import Select, { MultiValue } from 'react-select';

interface Option {
  value: number;
  label: string;
  group?: string;
}

interface Props {
  label: string;
  selected: number[];
  onChange: (ids: number[]) => void;
  fetchUrl: string;
}

export default function GroupedAsyncMultiSelect({ label, selected, onChange, fetchUrl }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item: any) => ({
          value: item.id,
          label: item.name,
          group: item.farm?.name || 'Ungrouped',
        }));
        setOptions(formatted);
        setLoading(false);
      });
  }, [fetchUrl]);

  const groupedOptions = Object.entries(
    options.reduce((acc, option) => {
      const group = option.group || 'Ungrouped';
      acc[group] = acc[group] || [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, Option[]>)
  ).map(([label, opts]) => ({
    label,
    options: opts,
  }));

  const selectedOptions = options.filter(opt => selected.includes(opt.value));

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <Select
        isMulti
        isLoading={loading}
        options={groupedOptions}
        value={selectedOptions}
        //onChange={(selected: any[]) => onChange(selected.map((opt: { value: any; }) => opt.value))}
        onChange={(selected: MultiValue<Option>) => {
            const ids = selected.map(opt => opt.value);
            onChange(ids);
            }}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
