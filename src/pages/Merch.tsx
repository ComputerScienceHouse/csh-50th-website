import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MERCH_STORE_URL = "https://campusgroups.rit.edu/store?store_id=5077&cglink=1";

// PLACEHOLDER: Update merch items and prices as they are finalized
const merchItems = [
  { name: "CSH 50th T-Shirt (Mens & Womens, White & Black)", price: "$20" },
  { name: "CSH 50th Hoodie (Unisex, Gray)", price: "$35" },
  { name: "CSH 50th Crewneck Sweatshirt (Unisex, Gray)", price: "$30" },
];

const Merch = () => {
  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl glass rounded-2xl border border-border p-8 md:p-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-center">Merch</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground text-center">
              To celebrate our 50th anniversary, we have some limited edition merch available for purchase! These items are high quality and embroidered, making them the perfect memorabilia that will last years. Merchandise can be purchased from the check-in table, using cash or card.
            </p>

            {/* Merch Items Table */}
            <div className="mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-semibold">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 text-center">
              <a
                href={MERCH_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Merch;
