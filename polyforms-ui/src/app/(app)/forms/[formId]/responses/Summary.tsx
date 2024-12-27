"use client";
import { getResponseSummary } from "@/actions/response";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSummary, Form } from "@/type";
import moment from "moment";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Summary = ({ form }: { form: Form }) => {
  const [fields, setFields] = useState<FieldSummary[]>();

  useEffect(() => {
    getResponseSummary(form.id!).then((res) => {
      setFields(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      {fields?.map((field) => {
        if (field.field.fieldType == "SINGLE_CHOICE" || field.field.fieldType == "MULTI_CHOICE") {
          return (
            // <PieChart width={250} height={250}>
            //   <Pie data={field.values} dataKey="count" nameKey="value" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
            //     <LabelList dataKey="value" position="left" />
            //   </Pie>
            // </PieChart>
            <div className="grid grid-cols-2">
              <Card key={field.field.id}>
                <CardHeader>
                  <CardTitle>{field.field.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {field?.values?.map((val, i) => {
                    if (field.field.fieldType == "DATE") {
                      return (
                        <div className="p-2 odd:bg-slate-100" key={i + "" + val.value}>
                          {moment(val.value.toString()).format("D MMM Y")} - {val.count}
                        </div>
                      );
                    }

                    return (
                      <div className="p-2 odd:bg-slate-100" key={i + "" + val.value}>
                        {val.value.toString()} - {val.count}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{field.field.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart width={400} height={250} data={field.values}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="value" />
                      <YAxis />
                      <Legend />
                      <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          );
        }
        return (
          <Card key={field.field.id}>
            <CardHeader>
              <CardTitle>{field.field.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {field?.values?.map((val, i) => {
                if (field.field.fieldType == "DATE") {
                  return (
                    <div className="p-2 odd:bg-slate-100" key={i + "" + val.value}>
                      {moment(val.value.toString()).format("D MMM Y")} - {val.count}
                    </div>
                  );
                }

                return (
                  <div className="p-2 odd:bg-slate-100" key={i + "" + val.value}>
                    {val.value.toString()} - {val.count}
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

export default Summary;
