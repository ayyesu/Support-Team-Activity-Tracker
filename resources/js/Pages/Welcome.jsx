import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Support Team Activity Tracker" />

            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-gray-100 dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-4xl mx-auto p-6 lg:p-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Welcome to the Support Team Activity Tracker
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        This system allows you to track, update, and report on
                        the daily activities of your application support team.
                        Get started by logging in or registering your account.
                    </p>
                    <div className="mt-10">
                        <Link
                            href={route("dashboard")}
                            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
