import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/type";
import ResponseQuestion from "./responses/ResponseQuestion";
import SingleQuestion from "./responses/SingleQuestion";
import Summary from "./responses/Summary";

const ResponseLayout = ({ form }: { form: Form }) => {
  return (
    <div>
      <CardHeader>
        <Tabs defaultValue="editor" className="">
          <Card className="pt-4 px-4">
            <TabsList className="grid grid-cols-3 mb-4 ">
              <TabsTrigger value="editor">Summary</TabsTrigger>
              <TabsTrigger value="responses">Questions</TabsTrigger>
              <TabsTrigger value="settings">Responses</TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="editor">
            <Summary form={form} />
          </TabsContent>
          <TabsContent value="responses">
            <ResponseQuestion form={form} />
          </TabsContent>
          <TabsContent value="settings">
            <SingleQuestion form={form} />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </div>
  );
};

export default ResponseLayout;
