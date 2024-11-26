import Link from "next/link";
import { getFamilys } from "./actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function familyCard() {
  const familys = await getFamilys();
  console.log(familys);
  return (
    <div>
      {familys.map((family) => {
        return (
          <Link href={`/dashboard/family/${family.family.id}`} key={family.family.id}>
            <Card>
              <CardHeader className="h-24">
                <CardTitle>{family.family.name.toLocaleUpperCase()}</CardTitle>
                <CardDescription>
                  Created on {family.family.createdAt.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
