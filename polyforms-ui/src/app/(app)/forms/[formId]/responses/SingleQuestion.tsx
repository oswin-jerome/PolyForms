"use client";
import { getResponseSingle } from "@/actions/response";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, Submission } from "@/type";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SingleQuestion = ({ form }: { form: Form }) => {
  const [last, setLast] = useState(1);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<Submission>();
  useEffect(() => {
    getData(current);
  }, []);

  const getData = async (page = 0) => {
    const data = await getResponseSingle(form.id!, page - 1);
    console.log(data);
    setLast(data.data.totalPages);
    setCurrent(page);
    setData(data.data.content[0]);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Button variant={"ghost"} disabled={current == 1} onClick={() => getData(current - 1)}>
              <ChevronLeftIcon />
            </Button>
            <span>
              {current} / {last}
            </span>
            <Button variant={"ghost"} disabled={current == last} onClick={() => getData(current + 1)}>
              <ChevronRightIcon />
            </Button>
          </div>
        </CardHeader>
      </Card>
      <section className="space-y-2 mt-6">
        {data?.responseEntries.map((re) => {
          return (
            <Card key={re.id}>
              <CardHeader>
                <CardTitle>{re.field.title}</CardTitle>
                {re.field.fieldType != "MULTI_CHOICE" && <CardDescription>{re.value}</CardDescription>}
                {re.field.fieldType == "MULTI_CHOICE" && <CardDescription>{re.values.toString().replaceAll(",", ", ")}</CardDescription>}
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default SingleQuestion;
