"use client";
import { createSubmission } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldState, Form } from "@/type";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PolyForm = ({ form }: { form: Form }) => {
  const router = useRouter();
  const f: FieldState[] = form.fields.map(
    (val): FieldState => ({
      id: val.id!,
      value: "",
      values: [],
    }),
  );

  const [fields, setFields] = useState<FieldState[]>([...f]);

  const updateFieldState = (fields: FieldState[], index: number, newValue: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], value: newValue };
    return updatedFields;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await createSubmission(form.id!, fields);
    if (res.ok) {
      router.push("/success");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="pt-10 max-w-2xl mx-auto space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
          </Card>
          {form.fields.map((field, index) => {
            console.log(field.fieldType);
            switch (field.fieldType) {
              case "TEXT":
                return (
                  <Card key={field.id} className="space-y-2 p-4">
                    <Label>
                      {field.title} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      value={fields[index].value}
                      onChange={(e) => {
                        setFields(updateFieldState(fields, index, e.target.value));
                      }}
                      required={field.required}
                    />
                  </Card>
                );
              case "DATE":
                return (
                  <Card key={field.id} className="space-y-2 p-4">
                    <Label>
                      {field.title} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      value={fields[index].value}
                      onChange={(e) => {
                        setFields(updateFieldState(fields, index, e.target.value));
                      }}
                      required={field.required}
                      type="date"
                    />
                  </Card>
                );
              case "SINGLE_CHOICE":
                return (
                  <Card className="space-y-2 p-4">
                    <Label>
                      {field.title} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {field.options.map((option, i) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <Input
                            checked={fields[index].value === option}
                            onChange={(e) => {
                              setFields(updateFieldState(fields, index, e.target.value));
                            }}
                            required={field.required}
                            value={option}
                            type="radio"
                            key={i + option + "" + field.id}
                            name={field.id?.toString()}
                            className="size-4"
                          />
                          <Label>{option}</Label>
                        </div>
                      );
                    })}
                  </Card>
                );
              case "MULTI_CHOICE":
                return (
                  <Card className="space-y-2 p-4">
                    <Label>
                      {field.title} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {field.options.map((option, i) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <Input
                            checked={fields[index].values.includes(option)}
                            onChange={(e) => {
                              const temp = Array.from(fields);
                              if (!temp[index].values.includes(e.target.value)) {
                                temp[index].values.push(e.target.value);
                                setFields(temp);
                              } else {
                                let t = Array.from(temp[index].values);
                                t = t.filter((b) => b !== e.target.value);
                                temp[index].values = t;
                                setFields(temp);
                              }
                            }}
                            // required={field.required}
                            value={option}
                            type="checkbox"
                            key={i + option + "chk" + field.id}
                            name={field.id?.toString()}
                            className="size-4"
                          />
                          <Label>{option}</Label>
                        </div>
                      );
                    })}
                  </Card>
                );
              default:
                return <div key={field.id}>Nan</div>;
            }
          })}
          <Button>Submit</Button>
        </section>
      </form>
    </div>
  );
};

export default PolyForm;
