"use client";

import { updateFrom } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form } from "@/type";
import { useState } from "react";

export default function SettingsCard({ form }: { form: Form }) {
  const [formData, setFormData] = useState(form);

  const [allowResponses, setAllowResponses] = useState(true);
  const [maxResponses, setMaxResponses] = useState<string>("0");

  const handleMaxResponsesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxResponses(value);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Response Settings</CardTitle>
        <CardDescription>Configure how responses are handled</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="allow-responses" className="flex flex-col space-y-1">
            <span>Allow Responses</span>
            <span className="font-normal text-sm text-muted-foreground">Enable or disable response submissions</span>
          </Label>
          <Switch
            id="allow-responses"
            checked={formData.allowResponse}
            onCheckedChange={async (e) => {
              setFormData({ ...formData, allowResponse: e });
              const res = await updateFrom(form.id!, {
                allowResponse: e,
                responseLimit: 10,
              });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-responses" className="flex flex-col space-y-1">
            <span>Maximum Responses</span>
            <span className="font-normal text-sm text-muted-foreground">Set the maximum number of responses allowed (0 for no limit)</span>
          </Label>
          <Input
            id="max-responses"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.responseLimit}
            onChange={(e) => {
              if (e.target.value === "") {
                e.target.value = "0";
              }
              setFormData({ ...formData, responseLimit: parseInt(e.target.value) ?? 0 });
            }}
            placeholder="Enter maximum responses"
          />
          {maxResponses === "0" && <p className="text-sm text-muted-foreground mt-1">No limit will be applied to the number of responses.</p>}
        </div>
        <Button
          onClick={(e) => {
            console.log(formData.responseLimit);
            updateFrom(form.id!, {
              responseLimit: formData.responseLimit,
            });
          }}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
