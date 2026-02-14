// =============================================================================
// Boulder SantaCon — Event Configuration
// =============================================================================
// UPDATE THIS FILE EACH YEAR. All event-specific data lives here so you
// don't have to dig through component code.
// =============================================================================

const EVENT_CONFIG = {

    // -------------------------------------------------------------------------
    // Core Event Info
    // -------------------------------------------------------------------------
    name: "Boulder SantaCon",
    year: 2026,
    edition: "20th Annual",
    tagline: "Black Friday",
    date: "2026-11-27",              // YYYY-MM-DD (Black Friday 2026)
    startTime: "17:00",              // 24h format
    endTime: "01:00",                // next day
    displayDate: "Black Friday, Nov. 27, 2026",
    url: "https://santarchy.app/",

    meta: {
        title: "Boulder SantaCon 2026 - Black Friday",
        description: "Join us for the 20th Annual Boulder SantaCon! Black Friday, November 27th, 2026. Dress up as Santa and celebrate the holidays Boulder-style!",
        image: "https://santarchy.app/img/header.jpg",
    },

    social: {
        instagram: "https://www.instagram.com/bouldersantacon",
        facebookEvent: "https://www.facebook.com/events/1458481705240919",  // UPDATE each year
        youtubeEmbed: "https://www.youtube.com/embed/-QGoHJ2Izwo?origin=https://boulder-santacon.com",
    },

    // -------------------------------------------------------------------------
    // Calendar (.ics) Download
    // -------------------------------------------------------------------------
    calendar: {
        uid: "bouldersantacon2026@santarchy.app",
        dtstamp: "20261106T000000Z",
        dtstart: "20261127T170000",
        dtend: "20261128T010000",
        summary: "Boulder SantaCon 2026",
        description: "The 20th Annual Boulder SantaCon! Dress up as Santa and join us for a festive night through Boulder. Visit https://santarchy.app for schedule and details.",
        location: "Avanti F&B, 1401 Pearl St, Boulder, CO 80302",
        filename: "boulder-santacon-2026.ics",
    },

    // -------------------------------------------------------------------------
    // Mailchimp Newsletter
    // -------------------------------------------------------------------------
    mailchimp: {
        actionUrl: "https://us7.list-manage.com/subscribe/post?u=97c79a453122b17d97b904bea&id=2562f63497",
        honeypotField: "b_2562f63497",
    },

    // -------------------------------------------------------------------------
    // Schedule Stops
    // -------------------------------------------------------------------------
    schedule: [
        {
            time: "5:00 - 6:30pm",
            title: "Avanti F&B",
            venue: "Roof top lounge",
            text: "Meet Santa on the roof top lounge.",
            drinkSpecials: "Mule Tide: (Gin, Pomegranate liqueur, Allspice Dram, cinnamon hibiscus, rosemary, lime, ginger beer.) | Spiked Eggnog: (Bacardi Spiced, Amaro, eggnog)",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1964.7278793680014!2d-105.27691744636638!3d40.0178103639815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bed2929560fbd%3A0xbe3c1820b8797eee!2sAvanti%20Food%20and%20Beverage%20Boulder!5e1!3m2!1sen!2sus!4v1762220992124!5m2!1sen!2sus",
            mapLink: "https://maps.app.goo.gl/uXvk9P3sDBJoXFJVA",
            notes: "When Santa is ready to leave, exit using the stairwell on the outdoor patio. We will gather the Santas and then head to \"Santa's Alley.\"",
            startMinutes: 17 * 60,
            endMinutes: 18 * 60 + 30,
        },
        {
            time: "6:30 - 7:00pm",
            title: "Pearl Street Mall",
            venue: "Caroling and Group Photo",
            text: "After Santa's Alley, head east down the alley to 15th Street and loop around back onto Pearl St. by Illegal Pete's. We will continue to the Court House for a Group photo op and then sing a few carols.",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1118.6936876331285!2d-105.2780970909969!3d40.01849507885064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bed6384ffa061%3A0x12051a85a97cca48!2sBoulder%20County%20Historic%20Court%20House!5e1!3m2!1sen!2sus!4v1762221010590!5m2!1sen!2sus",
            mapLink: "https://maps.app.goo.gl/2EEgyuTTbZWFPHFS6",
            notes: null,
            startMinutes: 18 * 60 + 30,
            endMinutes: 19 * 60,
        },
        {
            time: "7:00 - 7:45pm",
            title: "The Spotted James",
            venue: "Formerly The Walrus",
            text: "We haven't been to The James in a few years so we thought it's time to pay them a visit.",
            drinkSpecials: "Labatt draft + pickle shot for $8!",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.6656851569173!2d-105.2837285588913!3d40.01670627162523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bedbf881c8319%3A0x6ae46986776b8279!2sThe%20Spotted%20James!5e1!3m2!1sen!2sus!4v1762539907771!5m2!1sen!2sus",
            mapLink: null,
            notes: "If you're hungry, The Rio, T|aco, and Rosetta Hall are nearby.",
            startMinutes: 19 * 60,
            endMinutes: 19 * 60 + 45,
        },
        {
            time: "7:45 - 9:00pm",
            title: "St. Julien Hotel",
            venue: "T-Zero Bar and the Grand Lobby",
            text: "This is Santa's favorite stop! The Julien won't say it publicly, but they LOVE when Santa visits them!",
            music: "David Lawrence and the Spoonful",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7591.427428751109!2d-105.28521968514423!3d40.01584274961552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bec26a391b9e9%3A0x86495a6b403f6317!2sSt%20Julien%20Hotel%20%26%20Spa!5e1!3m2!1sen!2sus!4v1762221047809!5m2!1sen!2sus",
            mapLink: "https://maps.app.goo.gl/wQpMRekk78dy9B778",
            notes: "If the line for drinks is too long, head to Jill's around the corner to the left.",
            startMinutes: 19 * 60 + 45,
            endMinutes: 21 * 60,
        },
        {
            time: "9:00 - 1:00am",
            venue: "The Santa Ball @ The Riverside",
            text: "This is our last stop and the official after party for SantaCon! Make sure to grab a ticket before it sells out!",
            isAfterParty: true,
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d474.47377773047225!2d-105.27881746029514!3d40.014467182362914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bec258e8bfb7f%3A0xbf27b5a8462b87a6!2sThe%20Riverside%20Private%20%26%20Public%20Event%20Venue!5e1!3m2!1sen!2sus!4v1762220959898!5m2!1sen!2sus",
            mapLink: "https://maps.app.goo.gl/M6BUwhF2ZvT6ZQ9A8",
            notes: null,
            startMinutes: 21 * 60,
            endMinutes: 25 * 60,
        }
    ],

    // -------------------------------------------------------------------------
    // After-Party Details
    // -------------------------------------------------------------------------
    afterParty: {
        name: "Santa Ball 2026",
        edition: "4th annual",
        venue: "The Riverside",
        time: "9:00 PM - 1:00 AM",
        price: "$20",
        ticketUrl: "https://www.eventbrite.com/e/santa-ball-2025-the-boulder-santacon-official-after-party-tickets-1963688271481",  // UPDATE each year
        headerImage: "img/santaballheader.jpg",
        djs: ["Flaming Olive", "Ignyte", "Bounce", "Secret Santa"],
        extras: "Photo Booth, Food/Drink/Cookies!",
        blurb: "Please join us for the 4th annual Santa Ball, the official after-party for Boulder SantaCon! If you've come to the Santa Ball before, then you know how we throw down!",
        fundingNote: "As always, the SantaCon crawl is a FREE event, but the official after-party requires a ticket. We pay the venue, the DJ's, rent gear, etc. Thank you immensely for helping us \"Keep Boulder Weird.\"",
    },

    // -------------------------------------------------------------------------
    // Venue Quests (Side Quests)
    // -------------------------------------------------------------------------
    venueQuests: [
        {
            id: "hotelBoulderado",
            name: "Hotel Boulderado",
            quest: "\ud83d\udcf7 Take your picture in front of the Christmas tree in the lobby",
            distance: "2 min. from the Courthouse",
            unlockTime: 17 * 60,
            availableUntil: 19 * 60 + 30,
            icon: "\ud83d\udcf7",
        },
        {
            id: "velvetElk",
            name: "The Velvet Elk",
            quest: "\ud83c\udf7a Grab a drink",
            distance: "1 min. from the Courthouse",
            unlockTime: 17 * 60,
            availableUntil: 19 * 60 + 30,
            icon: "\ud83c\udf7a",
        },
        {
            id: "pizzaCalore",
            name: "Pizza Calore",
            quest: "\ud83c\udf55 Grab a slice between stops",
            distance: "1 min. from the Courthouse",
            unlockTime: 17 * 60,
            availableUntil: 19 * 60 + 30,
            icon: "\ud83c\udf55",
        },
        {
            id: "taco",
            name: "T|Aco",
            quest: "\ud83c\udf79 Get a margarita and some chips!",
            distance: "2 min. from The Spotted James",
            unlockTime: 19 * 60,
            availableUntil: 20 * 60 + 30,
            icon: "\ud83c\udf79",
        },
        {
            id: "jungle",
            name: "Jungle",
            quest: "\ud83c\udf79 Get a tiki drink!",
            distance: "5 min. from The Spotted James",
            unlockTime: 19 * 60,
            availableUntil: 20 * 60 + 30,
            icon: "\ud83c\udf79",
        }
    ],

    // -------------------------------------------------------------------------
    // Challenges
    // -------------------------------------------------------------------------
    challenges: [
        { id: "niceOrNaughty",  label: "Ask a stranger if they've been Nice (or Naughty) this year" },
        { id: "groupPhoto",     label: "Take a group Santa photo" },
        { id: "findElf",        label: "Find someone dressed as an elf and tell them to get back to work" },
        { id: "singCarol",      label: "Sing a carol in public" },
        { id: "giveGift",       label: "Give a naughty (or nice) gift to a stranger" },
        { id: "compliment5",    label: "Compliment 5 strangers" },
        { id: "buyDrink",       label: "Buy someone a drink" },
        { id: "congaLine",      label: "Dance in a Santa conga line!" },
        { id: "postSocial",     label: "Post a photo to your Insta/TikTok/FB account" },
        { id: "highFive10",     label: "High-five 10 people" },
        { id: "photoCop",       label: "Get a photo with a Boulder cop" },
        { id: "boulderLegend",  label: "This is my 3rd+ SantaCon!" },
    ],

    // -------------------------------------------------------------------------
    // Badges
    // -------------------------------------------------------------------------
    badges: {
        jollyLeader: {
            emoji: "\ud83c\udf85\ud83c\udffb",
            title: "JOLLY LEADER",
            shortDescription: "Lead a carol sing-along in public",
            popupMessage: "Your golden voice carried all the off-key Santas! You should be on America's Got Talent!",
            popupButton: "High Five! \ud83d\ude4c",
        },
        giftGiver: {
            emoji: "\ud83c\udf81",
            title: "GIFT GIVER",
            shortDescription: "Buy a fellow Santa some holiday cheer",
            popupMessage: "Santa's checking his list, and you're officially on the Nice list! Your heart grew 3 sizes!",
            popupButton: "Cheers! \ud83c\udf7b",
        },
        paparazzi: {
            emoji: "\ud83d\udcf8",
            title: "PAPARAZZI",
            shortDescription: "Snap photos at 3+ locations",
            popupMessage: "You've documented this night better than TMZ! These pics will be legendary (or at least blackmail-worthy).",
            popupButton: "Noice! \ud83d\ude0e",
        },
        marathonSanta: {
            emoji: "\ud83c\udfc3",
            title: "MARATHON SANTA",
            shortDescription: "Complete all 4 official stops",
            popupMessage: "You conquered all 5 stops! Your liver is a champion, and you need help! Legend status: achieved.",
            popupButton: "You're #1! \ud83e\udd47",
            autoUnlockMinutes: 20 * 60 + 15,
        },
        superSanta: {
            emoji: "\ud83d\udcaa\ud83c\udffb",
            title: "SUPER SANTA",
            shortDescription: "Crush 3+ side quests",
            popupMessage: "Most people stick to the main route. You? You're an overachiever. We're impressed. Your mom is proud.",
            popupButton: "Flex! \ud83d\udcaa",
            requireVenueQuests: 1,
            requireChallenges: 5,
        },
        boulderLegend: {
            emoji: "\ud83e\udee1",
            title: "BOULDER LEGEND",
            shortDescription: "Veteran of 3+ SantaCons",
            popupMessage: "Three years of SantaCon? You're basically Boulder SantaCon royalty! Put this on your resume.",
            popupButton: "Respect! \ud83e\udee1",
        },
    },

    // -------------------------------------------------------------------------
    // About Page — "What to Bring" checklist
    // -------------------------------------------------------------------------
    whatToBring: [
        "Valid ID",
        "Cash (some bars get busy)",
        "Gifts! Nice gifts for kids, \"naughty\" gifts for adults!",
        "Layers, gloves, hand warmers, etc. Santa will be outside!",
        "\"Water\" bottle",
    ],

    // -------------------------------------------------------------------------
    // Santa's Rules
    // -------------------------------------------------------------------------
    rules: [
        {
            title: "1. Santa looks like Santa.",
            text: "HOLIDAY APPAREL IS MANDATORY. A Santa hat is NOT ENOUGH. Dress as an elf, a reindeer, a christmas tree, Hanukkah Harry, a lump of coal, etc. If you show up without a costume, you will wish that you had! SantaCon is more fun if everyone is participating!",
            image: "img/costumes.jpg",
        },
        {
            title: "2. Address your fellow santa as \"Santa.\"",
        },
        {
            title: "3. When Santa \"ho, Ho, HO's,\" it's time to go, Go, GO!",
            text: "When you hear all the Santa's chant, \"HO! HO! HO!\" it means that we're getting ready to leave to the next stop.",
        },
        {
            title: "4. Who's in Charge?",
            text: "Santa. Memorize that phrase, and repeat it if anyone in authority asks you who the boss is. There will be a test.",
        },
        {
            title: "5. Don't be \"that\" Santa",
            text: "Everybody loves the big guy, right? HOWEVER, Santa strongly encourages Santa to obey all \"requests\" made by any security guards and police officers, to ensure that no one ends up in the klink.",
            image: "img/lineup.jpg",
        },
        {
            title: "6. Santa is a good tipper!",
            text: "Remember to tip your bartenders and servers. They work hard to keep Santa jolly!",
        },
    ],

    // -------------------------------------------------------------------------
    // Locked-quest teaser text (keyed by unlock time in minutes)
    // -------------------------------------------------------------------------
    lockedQuestTeasers: {
        1020: "3 nearby venues ready to explore\u2014snap photos, grab drinks, and refuel!",
        1140: "2 drink destinations with tropical vibes await!",
    },
};

export default EVENT_CONFIG;
