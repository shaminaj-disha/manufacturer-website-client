import React from 'react';

const BusinessSummary = () => {
    return (
        <div>
            {/* we served 100+ customers, 120M+ Annual revenue, 33K+ Reviews, 50+ tools, etc.  */}
            <div class="stats stats-vertical lg:stats-horizontal shadow-lg shadow-primary">

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div class="stat-title">Servered</div>
                    <div class="stat-value text-primary">100+ Customes</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div class="stat-title">Annual revenue</div>
                    <div class="stat-value text-secondary">120M+</div>
                    <div class="stat-desc">↗︎ 26M (22%)</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <div class="avatar online">
                            <div class="w-16 rounded-full">
                                <img src="https://api.lorem.space/image/face?w=128&h=128" alt='' />
                            </div>
                        </div>
                    </div>
                    <div class="stat-title">Reviews</div>
                    <div class="stat-value">33k+%</div>
                    <div class="stat-desc">38% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div class="stat-title">Tools</div>
                    <div class="stat-value text-accent">50+</div>
                    <div class="stat-desc">↗︎ 14 (28%)</div>
                </div>

            </div>

        </div>
    );
};

export default BusinessSummary;