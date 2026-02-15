const MailingListPage = ({ subscribeStatus, handleSubscribe }) => (
    <div className="space-y-6">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-red-700 mb-2">
                <i className="fas fa-scroll mr-2"></i>
                The Naughty List
            </h1>
        </div>

        <div className="glass-effect rounded-lg shadow-xl p-6">
            <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">🎄</span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Santa's making a list and checking it twice! Stay up to date on Boulder SantaCon.
                </h2>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-lg bg-white dark:bg-gray-800 dark:text-gray-100"
                        placeholder="santa@northpole.com"
                        autoComplete="email"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
                >
                    <i className="fas fa-gift mr-2"></i>
                    Subscribe
                </button>

                {subscribeStatus && (
                    <div className={`text-center py-2 px-4 rounded-lg ${
                        subscribeStatus.includes('Thanks')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {subscribeStatus}
                    </div>
                )}
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </div>
    </div>
);

export default MailingListPage;
