"use client";
import { updateField } from "@/actions/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/type";
import { debounce } from "lodash";
import { SaveIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
interface BuildCardProps {
  field: Field;
  formId: string;
  onDelete: () => void;
}

const BuildCard = ({ field, formId, onDelete }: BuildCardProps) => {
  const inputTypes = ["TEXT", "TEXTAREA", "SINGLE_CHOICE", "MULTI_CHOICE", "RATING", "DATE"]; // more to add

  const [fieldData, setFieldData] = useState(field);
  const [input, setInput] = useState("");
  const fieldRef = React.useRef<any>();
  const isInitialMount = useRef(true);

  const handleFieldChange = (key: keyof Field, value: any) => {
    setFieldData((prev) => ({ ...prev, [key]: value }));
  };
  const updateOptions = (newOptions: string[]) => {
    handleFieldChange("options", newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...fieldData.options];
    updatedOptions[index] = value;
    updateOptions(updatedOptions);
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = fieldData.options.filter((_, i) => i !== index);
    updateOptions(updatedOptions);
  };

  const handleAddOption = async () => {
    updateOptions([...fieldData.options, ""]);
  };

  const handleSave = async () => {
    const res = await updateField(formId, fieldData);
    console.log(res.data);
  };

  const debouncedFunction = React.useCallback(debounce(handleSave, 500), [handleSave]);

  useEffect(() => {
    // fieldRef.current?.focus();
  }, [fieldData.options.length]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      debouncedFunction();
    }
    return () => {
      debouncedFunction.cancel();
    };
  }, [fieldData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <Input className="flex-[2]" value={fieldData.title} onChange={(e) => handleFieldChange("title", e.target.value)} />
          <Select value={fieldData.fieldType} onValueChange={(e) => handleFieldChange("fieldType", e)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Field Type" />
            </SelectTrigger>
            <SelectContent>
              {inputTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {fieldData.fieldType === "TEXT" && <Input disabled />}
        {fieldData.fieldType === "DATE" && <Input type="date" disabled />}
        {fieldData.fieldType === "TEXTAREA" && <Textarea disabled />}
        {fieldData.fieldType === "SINGLE_CHOICE" && (
          <div>
            <ul className="space-y-2">
              {fieldData.options.map((option, index) => (
                <li key={index} className="flex items-center gap-4">
                  <Input type="radio" className="w-6" disabled />
                  <Input ref={fieldRef} className="flex-1" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                  <Button variant={"ghost"} onClick={() => handleOptionDelete(index)}>
                    <Trash2Icon className="size-5 text-muted-foreground" />
                  </Button>
                </li>
              ))}
              <li>
                <Button variant={"ghost"} onClick={handleAddOption}>
                  Add Option
                </Button>
              </li>
            </ul>
          </div>
        )}
        {fieldData.fieldType === "MULTI_CHOICE" && (
          <div>
            <ul className="space-y-2">
              {fieldData.options.map((option, index) => (
                <li key={index} className="flex items-center gap-4">
                  <Input type="checkbox" className="w-6" disabled />
                  <Input ref={fieldRef} className="flex-1" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                  <Button variant={"ghost"} onClick={() => handleOptionDelete(index)}>
                    <Trash2Icon className="size-5 text-muted-foreground" />
                  </Button>
                </li>
              ))}
              <li>
                <Button variant={"ghost"} onClick={handleAddOption}>
                  Add Option
                </Button>
              </li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground flex justify-end gap-4">
        <div className="flex items-center gap-1">
          <Label>Required</Label>
          <Switch
            checked={fieldData.required}
            onCheckedChange={(b) => {
              setFieldData({ ...fieldData, required: b });
            }}
          />
        </div>
        <Button variant={"ghost"} onClick={onDelete}>
          <Trash2Icon className="size-4" />
        </Button>
        <Button variant={"ghost"} onClick={handleSave}>
          <SaveIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuildCard;
