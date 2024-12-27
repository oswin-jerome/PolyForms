"use client";
import { getResponseQuestions } from "@/actions/response";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Form } from "@/type";
import { useEffect, useState } from "react";

const ResponseQuestion = ({ form }: { form: Form }) => {
  const [fields, setFields] = useState<Field[]>();

  useEffect(() => {
    getResponseQuestions(form.id!).then((res) => {
      // TODO: error check
      setFields(res.data);
    });
    console.log("###### FETCHING ########");
  }, []);

  return (
    <div className="space-y-4">
      {fields?.map((field) => {
        return (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle>{field.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {field.responseEntries?.map((res) => {
                if (field.fieldType == "MULTI_CHOICE") {
                  return (
                    <div className="p-1 odd:bg-slate-100" key={res.id}>
                      {res.values.toString().replaceAll(",", ", ")}
                    </div>
                  );
                }
                return (
                  <div className="p-1 odd:bg-slate-100" key={res.id}>
                    {res.value}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResponseQuestion;
