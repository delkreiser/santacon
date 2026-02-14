// =============================================================================
// About Page — Section Content
// =============================================================================
// Edit this file to update About page text without touching the component.
// Each section has: id, title, titleColor, subtitle, paragraphs, images, and
// optional links. The "rules" and "whatToBring" sections pull from event.js.
// =============================================================================

const aboutSections = [
    {
        id: "what",
        title: "What is SantaCon?",
        titleColor: "red",
        icon: null,
        subtitle: "It's not a pub crawl!",
        content: [
            {
                type: "text",
                value: "It is a non-profit, non-political, non-religious & non-sensical, non-logical celebration of holiday cheer, goodwill, and fun.",
            },
            {
                type: "image",
                src: "img/group.jpg",
                alt: "SantaCon",
            },
            {
                type: "text",
                value: "There is no good reason to dress up in cheap Santa suits, run around town, give gifts, sing songs, have strangers sit on our laps, and decide who is naughty or nice, but it's a lot of fun so Santa does it anyway. Everyone loves Santa and Santa loves everyone! SantaCon is your chance to be Santa, so step up and be jolly.",
            },
        ],
    },
    {
        id: "history",
        title: "SantaCon's History",
        titleColor: "green",
        icon: null,
        subtitle: "From Copenhagen to the world.",
        content: [
            {
                type: "text",
                value: 'SantaCon began in San Francisco in 1994, inspired by a 1974 Danish activist theatre group called Solvognen, who gathered dozens of "Santas" in Copenhagen to hand out items from department store shelves as "presents" before being arrested.',
            },
            {
                type: "image",
                src: "img/sfsantacon.jpg",
                alt: "San Francisco Cacophony Society SantaCon",
            },
            {
                type: "text",
                value: 'Staged as street theater by the San Francisco Cacophony Society\u2014a counterculture group focused on pranks and subversive art\u2014the first event was called "Cheap Suit Santas" and aimed to make fun of Christmas consumerism. Originally influenced by the Surrealist movement and Discordianism, it wasn\u2019t intended to be a recurring event, but returned in 1995 with 100 participants.',
            },
            {
                type: "image",
                src: "img/hanging.jpg",
                alt: "SantaCon History",
            },
            {
                type: "text",
                value: "SantaCon spread rapidly: Portland in 1996, Seattle in 1997, and Los Angeles and New York in 1998. The rise of the internet and the website Santarchy.com helped advertise the event, allowing people around the world to bring it to their cities. Today, SantaCon takes place in hundreds of cities globally, though it has evolved significantly from its countercultural roots into the festive pub crawl we know today.",
            },
            {
                type: "link",
                href: "https://journal.burningman.org/2022/12/opinion/shenanigans/meet-santa-zero/",
                icon: "fas fa-file-alt",
                label: "Interview: Meet Santa Zero",
            },
        ],
    },
    {
        id: "boulder",
        title: "Boulder's SantaCon",
        titleColor: "red",
        icon: null,
        subtitle: "The free-range, organic, gluten-free SantaCon.",
        content: [
            {
                type: "text",
                value: "Boulder SantaCon launched in 2006 with a simple mission: instead of fighting crowds at the mall on Black Friday, why not dress up as Santa and celebrate the holidays in the most ridiculous way possible? It was a subtle protest against consumerism wrapped in cheap red suits and holiday cheer.",
            },
            {
                type: "image",
                src: "img/first-santacon.jpg",
                alt: "First Boulder SantaCon",
            },
            {
                type: "text",
                value: 'The first few years were beautifully chaotic. We started with about 20 Santas "shopping" at the 29th Street Mall, much to the confusion of mall security. We\u2019d take the HOP bus downtown, which became known as "Santa\u2019s Sleigh." Dozens of Santas would cram in like festive sardines while bewildered commuters laughed and took photos. One year, a pop-up speakeasy called "Santa\u2019s Pub" appeared, serving cold PBR\u2019s, hot chocolate, and peppermint schnapps to thirsty Santas.',
            },
            {
                type: "image",
                src: "img/believe.jpg",
                alt: "Boulder SantaCon Believe",
            },
            {
                type: "text",
                // Uses {edition} placeholder — replaced at render time with EVENT_CONFIG.edition
                value: "This Black Friday marks our {edition} event and it has become a Boulder tradition. Unlike the rowdy reputation SantaCon has earned in other cities, Boulder\u2019s version has always been about fun, not mayhem. Come join Santa!",
                interpolate: { edition: "edition.toLowerCase()" },
            },
        ],
    },
];

export default aboutSections;
