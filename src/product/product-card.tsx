import { useGetProductsQuery } from "@/api/product/product";
import { useState } from 'react';

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ProductCard({ limit = 1000, offset = 0 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products, isLoading } = useGetProductsQuery({ limit, offset , title: searchQuery});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); 
  };

  const trunc = (text: string | undefined, maxLength: number): string =>
    text && text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text || '';

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
  <>
   <div  className="w-[290px] my-5 mx-2">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
   </div>
    <div className="grid grid-cols-4 gap-4">
      {products?.map((product) => (
        <Card key={product.id} className="w-[300px] h-[570px]">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{trunc(product.description, 200)}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-center">
              <img src={product.images} alt={product.title} className="w-full h-auto object-cover rounded-md" />
            </div>
            <div className="text-lg font-semibold text-muted-foreground">
              Price: ${product.price}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Buy now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </>
  );
}
