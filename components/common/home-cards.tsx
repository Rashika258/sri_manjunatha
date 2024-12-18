import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export function HomeCards() {
  const cardDetails = [
    {
      id: 1,
      title: "Adinath",
      route: "adinath",
      description: "",
    },
    {
      id: 2,
      title: "Neta",
      route: "neta",
      description: "",
    },
    {
      id: 3,
      title: "Premium",
      route: "premium",
      description: "",
    },
  ];

  return (
    <div className="flex flex-wrap">
      {cardDetails &&
        cardDetails?.length > 0 &&
        cardDetails?.map((item, idx) => {
          return (
            <Card key={idx + item?.id} className="w-[300px] h-[250px]">
              <CardHeader>
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild>
                  <Link href={`/bills/${item?.route}`}>Check bills</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}
