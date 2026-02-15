import EVENT_CONFIG from '../config/event.js';
import aboutSections from '../data/about.js';
import OptimizedImage from './OptimizedImage.jsx';

const TITLE_COLORS = {
    red: 'text-red-700',
    green: 'text-green-700',
};

/** Render a single content block (text, image, or link) */
const ContentBlock = ({ block }) => {
    switch (block.type) {
        case 'text': {
            let text = block.value;
            if (block.interpolate) {
                // Replace {edition} etc. with EVENT_CONFIG values
                for (const [key, expr] of Object.entries(block.interpolate)) {
                    const value = expr === 'edition.toLowerCase()'
                        ? EVENT_CONFIG.edition.toLowerCase()
                        : EVENT_CONFIG[key];
                    text = text.replace(`{${key}}`, value);
                }
            }
            return <p className="text-gray-700 dark:text-gray-300 mb-4">{text}</p>;
        }
        case 'image':
            return (
                <OptimizedImage
                    src={block.src}
                    alt={block.alt}
                    className="w-full max-w-lg mx-auto mb-4 rounded-lg shadow-lg"
                />
            );
        case 'link':
            return (
                <a
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                    {block.icon && <i className={`${block.icon} mr-2`}></i>}
                    {block.label}
                </a>
            );
        default:
            return null;
    }
};

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

            {/* Data-driven sections (What, History, Boulder) */}
            {aboutSections.map((section) => (
                <div key={section.id} id={`section-${section.id}`} className="glass-effect rounded-lg shadow-xl overflow-hidden">
                    <button onClick={() => toggleSection(section.id)} aria-expanded={expandedAbout === section.id} className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h2 className={`text-2xl font-bold ${TITLE_COLORS[section.titleColor] || 'text-red-700'} mb-2`}>
                                    {section.icon && <i className={`${section.icon} mr-2`}></i>}
                                    {section.title}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300">{section.subtitle}</p>
                            </div>
                            <i className={`fas fa-chevron-${expandedAbout === section.id ? 'up' : 'down'} text-gray-400 dark:text-gray-500 ml-4 text-xl`}></i>
                        </div>
                    </button>
                    {expandedAbout === section.id && (
                        <div className="px-6 pb-6 border-t-2 border-gray-200 dark:border-gray-600 pt-4">
                            {section.content.map((block, i) => (
                                <ContentBlock key={i} block={block} />
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Santa's Rules — driven by EVENT_CONFIG.rules */}
            <div id="section-rules" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('rules')} aria-expanded={expandedAbout === 'rules'} className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-green-700 mb-2">
                                <i className="fas fa-list-ol mr-2"></i>
                                Santa's Rules
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">Yes, SantaCon has a few rules.</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'rules' ? 'up' : 'down'} text-gray-400 dark:text-gray-500 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'rules' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 dark:border-gray-600 pt-4">
                        <div className="space-y-4">
                            {EVENT_CONFIG.rules.map((rule, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">{rule.title}</h3>
                                    {rule.text && (
                                        <p className={`text-gray-700 dark:text-gray-300${rule.image ? ' mb-4' : ''}`}>
                                            {rule.text}
                                        </p>
                                    )}
                                    {rule.image && (
                                        <OptimizedImage
                                            src={rule.image}
                                            alt={rule.title}
                                            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* What to Bring — driven by EVENT_CONFIG.whatToBring */}
            <div id="section-bring" className="glass-effect rounded-lg shadow-xl overflow-hidden">
                <button onClick={() => toggleSection('bring')} aria-expanded={expandedAbout === 'bring'} className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-red-700 mb-2">
                                <i className="fas fa-shopping-bag mr-2"></i>
                                What to Bring?
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">Be prepared for Boulder SantaCon!</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedAbout === 'bring' ? 'up' : 'down'} text-gray-400 dark:text-gray-500 ml-4 text-xl`}></i>
                    </div>
                </button>
                {expandedAbout === 'bring' && (
                    <div className="px-6 pb-6 border-t-2 border-gray-200 dark:border-gray-600 pt-4">
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
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
