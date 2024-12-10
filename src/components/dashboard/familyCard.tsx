import Link from "next/link";
import { getFamilys } from "./actions";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function FamilyCard() {
  const familys = await getFamilys();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {familys.map((family) => {
        return (
          <Link
            href={`/dashboard/family/${family.familyId}`}
            key={family.familyId}
          >
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
