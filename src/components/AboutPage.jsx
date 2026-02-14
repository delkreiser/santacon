import React from 'react';
import EVENT_CONFIG from '../config/event.js';

const AboutPage = ({ expandedAbout, setExpandedAbout }) => {
    const toggleSection = (section) => {
        setExpandedAbout(expandedAbout === section ? null : section);
        if (expandedAbout !== section) {
            setTimeout(() => {
                document.getElementById(`section-${section}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-red-700 mb-2">
                    <i className="fas fa-info-circle mr-2"></i>
                    About SantaCon
                </h1>
            </div>

            {/* What is SantaCon */}
            <div id="section-what" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('what')} className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-red-700 mb-2">What is SantaCon?</h2>
                            <p className="text-gray-700">It's not a pub crawl!</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'what' ? 'up' : 'down'} text-gray-400 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'what' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                        <p className="text-gray-700 mb-4">
                            It is a non-profit, non-political, non-religious & non-sensical, non-logical celebration of
                            holiday cheer, goodwill, and fun.
                        </p>
                        <img src="img/group.jpg" alt="SantaCon" className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg" />
                        <p className="text-gray-700">
                            There is no good reason to dress up in cheap Santa suits, run around town, give gifts, sing songs,
                            have strangers sit on our laps, and decide who is naughty or nice, but it's a lot of fun so Santa
                            does it anyway. Everyone loves Santa and Santa loves everyone! SantaCon is your chance to be Santa,
                            so step up and be jolly.
                        </p>
                    </div>
                )}
            </div>

            {/* SantaCon's History */}
            <div id="section-history" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('history')} className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-green-700 mb-2">SantaCon's History</h2>
                            <p className="text-gray-700">From Copenhagen to the world.</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'history' ? 'up' : 'down'} text-gray-400 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'history' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                        <p className="text-gray-700 mb-4">
                            SantaCon began in San Francisco in 1994, inspired by a 1974 Danish activist theatre group called Solvognen, who gathered dozens of "Santas" in Copenhagen to hand out items from department store shelves as "presents" before being arrested.
                        </p>
                        <img src="img/sfsantacon.jpg" alt="San Francisco Cacophony Society SantaCon" className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg" />
                        <p className="text-gray-700 mb-4">
                            Staged as street theater by the San Francisco Cacophony Society—a counterculture group focused on pranks and subversive art—the first event was called "Cheap Suit Santas" and aimed to make fun of Christmas consumerism. Originally influenced by the Surrealist movement and Discordianism, it wasn't intended to be a recurring event, but returned in 1995 with 100 participants.
                        </p>
                        <img src="img/hanging.jpg" alt="SantaCon History" className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg" />
                        <p className="text-gray-700 mb-4">
                            SantaCon spread rapidly: Portland in 1996, Seattle in 1997, and Los Angeles and New York in 1998. The rise of the internet and the website Santarchy.com helped advertise the event, allowing people around the world to bring it to their cities. Today, SantaCon takes place in hundreds of cities globally, though it has evolved significantly from its countercultural roots into the festive pub crawl we know today.
                        </p>
                        <a
                            href="https://journal.burningman.org/2022/12/opinion/shenanigans/meet-santa-zero/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            <i className="fas fa-file-alt mr-2"></i>
                            Interview: Meet Santa Zero
                        </a>
                    </div>
                )}
            </div>

            {/* Boulder's SantaCon */}
            <div id="section-boulder" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('boulder')} className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-red-700 mb-2">Boulder's SantaCon</h2>
                            <p className="text-gray-700">The free-range, organic, gluten-free SantaCon.</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'boulder' ? 'up' : 'down'} text-gray-400 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'boulder' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                        <p className="text-gray-700 mb-4">
                            Boulder SantaCon launched in 2006 with a simple mission: instead of fighting crowds at the mall on Black Friday, why not dress up as Santa and celebrate the holidays in the most ridiculous way possible? It was a subtle protest against consumerism wrapped in cheap red suits and holiday cheer.
                        </p>
                        <img src="img/first-santacon.jpg" alt="First Boulder SantaCon" className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg" />
                        <p className="text-gray-700 mb-4">
                            The first few years were beautifully chaotic. We started with about 20 Santas "shopping" at the 29th Street Mall, much to the confusion of mall security. We'd take the HOP bus downtown, which became known as "Santa's Sleigh." Dozens of Santas would cram in like festive sardines while bewildered commuters laughed and took photos. One year, a pop-up speakeasy called "Santa's Pub" appeared, serving cold PBR's, hot chocolate, and peppermint schnapps to thirsty Santas.
                        </p>
                        <img src="img/believe.jpg" alt="Boulder SantaCon Believe" className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg" />
                        <p className="text-gray-700">
                            This Black Friday marks our {EVENT_CONFIG.edition.toLowerCase()} event and it has become a Boulder tradition. Unlike the rowdy reputation SantaCon has earned in other cities, Boulder's version has always been about fun, not mayhem. Come join Santa!
                        </p>
                    </div>
                )}
            </div>

            {/* Santa's Rules */}
            <div id="section-rules" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('rules')} className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-green-700 mb-2">
                                <i className="fas fa-list-ol mr-2"></i>
                                Santa's Rules
                            </h2>
                            <p className="text-gray-700">Yes, SantaCon has a few rules.</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'rules' ? 'up' : 'down'} text-gray-400 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'rules' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">1. Santa looks like Santa.</h3>
                                <p className="text-gray-700 mb-4">
                                    HOLIDAY APPAREL IS MANDATORY. A Santa hat is NOT ENOUGH. Dress as an elf, a reindeer,
                                    a christmas tree, Hanukkah Harry, a lump of coal, etc. If you show up without a costume, you will wish that you had! SantaCon is more fun if everyone is participating!
                                </p>
                                <img src="img/costumes.jpg" alt="Santa Costumes" className="w-full max-w-lg mx-auto rounded-lg shadow-lg" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">2. Address your fellow santa as "Santa."</h3>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">3. When Santa "ho, Ho, HO's," it's time to go, Go, GO!</h3>
                                <p className="text-gray-700">
                                    When you hear all the Santa's chant, "HO! HO! HO!" it means that we're getting ready to leave to the next stop.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">4. Who's in Charge?</h3>
                                <p className="text-gray-700">
                                    Santa. Memorize that phrase, and repeat it if anyone in authority asks you who the boss is.
                                    There will be a test.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">5. Don't be "that" Santa</h3>
                                <p className="text-gray-700 mb-4">
                                    Everybody loves the big guy, right? HOWEVER, Santa strongly encourages Santa to obey all
                                    "requests" made by any security guards and police officers, to ensure that no one ends up
                                    in the klink.
                                </p>
                                <img src="img/lineup.jpg" alt="Santa Lineup" className="w-full max-w-lg mx-auto rounded-lg shadow-lg" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-2">6. Santa is a good tipper!</h3>
                                <p className="text-gray-700">
                                    Remember to tip your bartenders and servers. They work hard to keep Santa jolly!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* What to Bring? */}
            <div id="section-bring" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('bring')} className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-red-700 mb-2">
                                <i className="fas fa-shopping-bag mr-2"></i>
                                What to Bring?
                            </h2>
                            <p className="text-gray-700">Be prepared for Boulder SantaCon!</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'bring' ? 'up' : 'down'} text-gray-400 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'bring' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                        <ul className="space-y-3 text-gray-700">
                            {EVENT_CONFIG.whatToBring.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutPage;
