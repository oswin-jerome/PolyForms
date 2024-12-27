"use client";

import { deleteField, reorder } from "@/actions/field";
import { createFormField, updateFrom } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/type";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import BuildCard from "./BuildCard";

const FromBuilder = ({ form }: { form: Form }) => {
  const [formData, setFormData] = useState(form);
  const [fields, setFields] = useState(form.fields);

  function handleFieldUpdate(description: string) {
    return () => {
      if (form.id == null) {
        return;
      }
      updateFrom(form.id, {
        [description]: Object(formData)[description],
      });
    };
  }

  function handleDragDrop() {
    return (result: any) => {
      if (!result.destination) return;
      const newBox = Array.from(fields);
      const [draggedItem] = newBox.splice(result.source.index, 1);
      newBox.splice(result.destination.index, 0, draggedItem);
      setFields(newBox);
      reorder(form.id ?? "", newBox).then((res) => {
        console.log(res);
      });
    };
  }

  function handleAddField() {
    return async () => {
      if (!form.id) {
        return;
      }

      const res = await createFormField(form.id, {
        fieldType: "TEXT",
        options: [],
        title: "Question",
        required: false,
      });
      setFields([...fields, res.data]);
      if (!res.ok) {
        return;
      }
    };
  }

  return (
    <div className="mt-10">
      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label>Form Name</Label>
              <Input
                value={formData?.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  });
                }}
                onBlur={handleFieldUpdate("title")}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label>Form Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                }}
                onBlur={handleFieldUpdate("description")}
              ></Input>
            </div>
          </CardContent>
        </Card>
        <DragDropContext onDragEnd={handleDragDrop()}>
          <Droppable droppableId="fields">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps} className="grid gap-0">
                  {fields.map((field, index) => {
                    return (
                      <Draggable key={field.id ?? "-1"} draggableId={field.id?.toString() ?? "-1"} index={index}>
                        {(pdb) => {
                          return (
                            <div className="my-2" ref={pdb.innerRef} {...pdb.dragHandleProps} {...pdb.draggableProps}>
                              <BuildCard
                                onDelete={() => {
                                  const newFields = Array.from(fields);
                                  newFields.splice(index, 1);
                                  setFields(newFields);
                                  deleteField(form.id!, field.id!);
                                }}
                                field={field}
                                key={field.id}
                                formId={form.id ?? ""}
                              ></BuildCard>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>

        <Button onClick={handleAddField()}>Add</Button>
      </section>
    </div>
  );
};

export default FromBuilder;
