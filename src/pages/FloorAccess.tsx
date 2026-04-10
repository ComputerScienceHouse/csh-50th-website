import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const LET_ME_IN_URL = "https://letmein.csh.rit.edu";

const FloorAccess = () => {
  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl glass rounded-2xl border border-border p-8 md:p-10 text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold">Need Floor Access?</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              CSH has a project called "Let Me In" to make it easy for those who don't have RIT IDs to get into DSP, the building where CSH is located. Need to be let in?
            </p>
            <a
              href={LET_ME_IN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block"
            >
              <Button variant="hero" size="lg">
                Take me to LetMeIn
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FloorAccess;
