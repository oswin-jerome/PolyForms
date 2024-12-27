import { Form } from "@/type";
import moment from "moment";
import { Card } from "./ui/card";

const FromCard = ({ form }: { form: Form }) => {
  return (
    <Card className="overflow-clip">
      <div className="h-32 bg-slate-400	"></div>
      <div className="p-4">
        <p className="font-semibold">{form.title}</p>
        <small className="text-xs text-muted-foreground">Last opened {moment(form.lastOpenedAt).format("D MMM Y")}</small>
      </div>
    </Card>
  );
};

export default FromCard;
