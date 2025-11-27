import React from 'react';
import { MessageSquare, Calendar, Users } from 'lucide-react';

export default function CommunityPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900">Community</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Connect with other developers and contribute to the project.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                        <div className="mx-auto p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Discussions</h3>
                        <p className="text-slate-600 mb-6">Ask questions, share ideas, and get help from the community.</p>
                        <button className="text-blue-600 font-medium hover:underline">Join Discord →</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                        <div className="mx-auto p-4 bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Events</h3>
                        <p className="text-slate-600 mb-6">Join our monthly community calls and hackathons.</p>
                        <button className="text-purple-600 font-medium hover:underline">View Calendar →</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                        <div className="mx-auto p-4 bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Contributors</h3>
                        <p className="text-slate-600 mb-6">Help us improve FlexChartJS by contributing code or docs.</p>
                        <button className="text-green-600 font-medium hover:underline">Contribution Guide →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
