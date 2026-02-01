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
        answer: "The event is open to CSH alumni, advisors, honorary members, current members, and their guests.",
      },
      {
        question: "How much does it cost to attend?",
        answer: "Attending CSH 50th is free. A few events however will require paid tickets. Ticket prices vary by event. Ticketed events include the Open Sauce Mixer on Friday, the Formal Dinner at Wintergarden on Saturday, and the Farewell Party at Swillburger/The Playhouse on Sunday. If you indicate when registering that you are interested in these events, we will reach out to you when tickets become available to purchase.",
      },
      {
        question: "Is there a dress code?",
        answer: "Yes, the dress code for our Formal Dinner at The Wintergarden is black tie optional. This means tuxedos, floor-length gowns, dark colored suits, or cocktail dresses. For all other events over the weekend, the dress code is casual.",
      },
      {
        question: "Will there be merchandise?",
        answer: "Yes, there will be merchandise available for purchase.",
      },
    ],
  },
  {
    title: "Registration & Tickets",
    questions: [
      {
        question: "How do I register for CSH 50th?",
        answer: "To register, please fill out the registration form. A button is at the top of this page.",
      },
      {
        question: "Can I get a refund if I can't attend?",
        answer: "Refund policies will be detailed on the ticket purchase page when that is finalized.",
      },
      {
        question: "Can I bring guests?",
        answer: "Yes! The registration form must be filled out individually for all guests, so please fill it out on their behalf or send it to them accordingly. Guests must also have their own ticket for each event, or you can purchase one on their behalf.",
      },
      {
        question: "Is there a deadline to register?",
        answer: "The deadline to register is March 15th at 11:59PM.",
      },
    ],
  },
  {
    title: "Accommodations & Travel",
    questions: [
      {
        question: "Are there hotel room blocks available?",
        answer: "Yes! We have three hotels. Visit the Hotels page for details and booking links.",
      },
      {
        question: "What's the closest airport?",
        answer: "Greater Rochester International Airport (ROC) is about 15 minutes from RIT campus. Major airlines including Delta, American, United, and Southwest serve the airport.",
      },
      {
        question: "Will there be shuttle service?",
        answer: "Yes, there will a shuttle service for the Formal Dinner at The Wintergarden. Buses will depart at 3:30PM and will do 3 rounds. Routes will include Hampton Inn (Henrietta), Courtyard Marriot (Brighton), and the RIT campus. They do NOT include Hilton Garden Inn Rochester Downtown. After the Formal Dinner at The Wintergarden, all buses will depart the venue at 10PM and stop one time at all three locations. The buses are first come, first serve, and space is not guaranteed.",
      },
      {
        question: "Is parking available?",
        answer: "Yes, parking is available at RIT. For events that aren't at RIT, street parking will be available. https://www.rit.edu/parking/visitors",
      },
    ],
  },
  {
    title: "Events & Activities",
    questions: [
      {
        question: "What events are included with registration?",
        answer: "Registration includes access to daytime events, floor tours, panels, and social gatherings. The Formal Dinner at The Wintergarden, the Open Sauce Mixer, and the Farewell Party at Swillburger/The Playhouse will require a separate ticket purchase that is not included in your registration.",
      },
      {
        question: "Where is the Formal Dinner being held?",
        answer: "The Saturday evening Formal Dinner will be held at The Wintergarden in Rochester. Exact address and directions will be provided closer to the event. There will also be a bus service",
      },
      {
        question: "Can I attend just the Formal Dinner at the Wintergarden?",
        answer: "Yes, you can purchase tickets for just the Formal Dinner if you can't attend the full weekend.",
      },
      {
        question: "Will there be activities for families/children?",
        answer: "The weekend events are primarily designed for adults, although children are welcome at most events, including the Formal Dinner at the Wintergarden. Please contact us if you have specific questions about bringing children.",
      },
    ],
  },
  {
    title: "Other Questions",
    questions: [
      {
        question: "How can I help or volunteer?",
        answer: "We welcome any help! Please reach out to the CSH 50th Planning Committee by joining the #50th channel on Slack, or by emailing 50th@csh.rit.edu",
      },
      {
        question: "I'm a current CSH member. How do I get involved?",
        answer: "Current members should speak with the CSH 50th Planning Committee for opportunities to help and participate. The best way to get involved is by joining the #50th channel on CSH Slack.",
      },
      {
        question: "Who do I contact with questions?",
        answer: "For general inquiries, please email 50th@csh.rit.edu or join the #50th channel on CSH Slack. We'll respond as quickly as possible.",
      },
      {
        question: "Will there be photography/video during the weekend?",
        answer: "There will be photography/video during the Formal Dinner at The Wintergarden. During all other events, you are encouraged to take your own photos and videos. By attending, you consent to be photographed for CSH promotional material. There will also be a modified Photohunt occurring during the 50th, which encourages all participants to take as many cool pictures as they can. These photos will be shown at the Formal Dinner.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
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
              {/* <a href="https://csh.rit.edu" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="lg">
                  CSH Website
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a> */}
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
            {/* <a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer">
              <Button variant="glass">Buy Tickets</Button>
            </a> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
