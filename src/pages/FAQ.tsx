import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, ExternalLink } from "lucide-react";

// PLACEHOLDER: Update FAQ content as more questions are determined
const faqCategories = [
  {
    title: "General",
    questions: [
      {
        question: "When is the CSH 50th Anniversary celebration?",
        answer: "The celebration will take place from Friday, April 10th to Sunday, April 12th, 2026 at Rochester Institute of Technology and the surrounding area in Rochester, NY.",
      },
      {
        question: "Who can attend the 50th anniversary events?",
        answer: "The event is open to CSH alumni, current members, and their guests. Some events may have capacity limits, so we encourage early registration.",
      },
      {
        question: "How much does it cost to attend?",
        answer: "Ticket prices vary by event. The main gala dinner requires a separate ticket purchase. Please check the ticket page for current pricing and packages.", // PLACEHOLDER: Update with actual pricing when available
      },
      {
        question: "Is there a dress code?",
        answer: "The Saturday evening gala dinner is a formal event (black tie optional). Other events throughout the weekend are casual unless otherwise noted.",
      },
    ],
  },
  {
    title: "Registration & Tickets",
    questions: [
      {
        question: "How do I register for the event?",
        answer: "You can register and purchase tickets through the official ticket page (link in navigation). Alumni should also fill out the RSVP form to help us plan accordingly.", // PLACEHOLDER: Clarify registration process
      },
      {
        question: "Can I get a refund if I can't attend?",
        answer: "Refund policies will be detailed on the ticket purchase page. Generally, refunds are available up to [X] days before the event.", // PLACEHOLDER: Update with actual refund policy
      },
      {
        question: "Can I bring guests?",
        answer: "Yes! When purchasing tickets, you can add guest tickets. Please register all guests so we can plan accordingly.",
      },
      {
        question: "Is there a deadline to register?",
        answer: "While there's no strict deadline, we encourage early registration to help us plan. Some events may reach capacity, so registering early ensures your spot.", // PLACEHOLDER: Add actual deadline if applicable
      },
    ],
  },
  {
    title: "Accommodations & Travel",
    questions: [
      {
        question: "Are there hotel room blocks available?",
        answer: "Yes! We've secured special rates at several hotels near RIT. Visit the Hotels page for details and booking codes.",
      },
      {
        question: "What's the closest airport?",
        answer: "Greater Rochester International Airport (ROC) is about 15 minutes from RIT campus. Major airlines including Delta, American, United, and Southwest serve the airport.",
      },
      {
        question: "Will there be shuttle service?",
        answer: "We're working on arranging shuttle service between hotels and event venues. Details will be updated as they're confirmed.", // PLACEHOLDER: Update when shuttle plans are finalized
      },
      {
        question: "Is parking available?",
        answer: "Yes, parking is available at RIT. For events that aren't at RIT, street parking will be available.", // PLACEHOLDER: Update with specific parking info
      },
    ],
  },
  {
    title: "Events & Activities",
    questions: [
      {
        question: "What events are included with registration?",
        answer: "Registration includes access to daytime events, floor tours, panels, and social gatherings. The formal gala dinner requires a separate ticket purchase.", // PLACEHOLDER: Clarify what's included
      },
      {
        question: "Where is the gala dinner being held?",
        answer: "The Saturday evening gala dinner will be held at VENUE in Rochester. Exact address and directions will be provided closer to the event.", // PLACEHOLDER: Replace VENUE with actual venue name
      },
      {
        question: "Can I attend just the gala dinner?",
        answer: "Yes, you can purchase tickets for just the gala dinner if you can't attend the full weekend.", // PLACEHOLDER: Confirm this is accurate
      },
      {
        question: "Will there be activities for families/children?",
        answer: "The weekend events are primarily designed for adults. Please contact us if you have specific questions about bringing children.", // PLACEHOLDER: Update based on actual family policy
      },
    ],
  },
  {
    title: "Other Questions",
    questions: [
      {
        question: "How can I help or volunteer?",
        answer: "We welcome any help! Please reach out to the 50th planning committee by joining the #50th channel on Slack, or by emailing 50th@csh.rit.edu",
      },
      {
        question: "I'm a current CSH member. How do I get involved?",
        answer: "Current members should speak with the CSH 50th planning committee for opportunities to help and participate. The best way to get involved is by joining the #50th channel on CSH Slack.",
      },
      {
        question: "Who do I contact with questions?",
        answer: "For general inquiries, please email 50th@csh.rit.edu or join the #50th channel on CSH Slack. We'll respond as quickly as possible.",
      },
      {
        question: "Will there be photography/video at the event?",
        answer: "Yes, we'll have official photographers and videographers capturing the celebration. By attending, you consent to being photographed for CSH promotional materials.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Notice Banner */}
      <div className="bg-amber-500/20 border-2 border-amber-500/50 py-4 px-4">
        <div className="container mx-auto text-center">
          <p className="text-amber-400 font-bold text-sm md:text-base tracking-wider">
            ⚠️ This website is a work in progress. Some contents (including the schedule) are just a placeholder and are subject to change. Some links, including the RSVP and ticket links, do not work.
          </p>
        </div>
      </div>
      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about the CSH 50th Anniversary celebration.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-csh-magenta" />
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((item, itemIndex) => (
                    <AccordionItem 
                      key={itemIndex} 
                      value={`${categoryIndex}-${itemIndex}`}
                      className="glass rounded-xl px-6 border-none"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium pr-4">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-csh-magenta mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? We're here to help! Reach out to the organizing team and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* PLACEHOLDER: Replace with actual contact email */}
              <a href="mailto:PLACEHOLDER@csh.rit.edu">
                <Button variant="hero" size="lg">
                  <Mail className="w-5 h-5" />
                  Email Us
                </Button>
              </a>
              {/* PLACEHOLDER: Replace with actual CSH website/contact page */}
              <a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="lg">
                  CSH Website
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-6">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/schedule">
              <Button variant="glass">View Schedule</Button>
            </a>
            <a href="/events">
              <Button variant="glass">See Events</Button>
            </a>
            <a href="/hotels">
              <Button variant="glass">Hotels & Travel</Button>
            </a>
            {/* PLACEHOLDER: Replace with actual ticket URL */}
            <a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer">
              <Button variant="glass">Buy Tickets</Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
