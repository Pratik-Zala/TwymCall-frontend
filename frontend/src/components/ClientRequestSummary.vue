<template>
    <section class="client-summary">
        <h2>Client Request Summary</h2>
        <div class="summary-grid">
            <div class="summary-card">
                <h3>Communication Statistics</h3>
                <div class="stats-content">
                    <p>
                        <span class="label">Emails:</span> <strong>{{ stats.emails }}</strong> |
                        <span class="label">WhatsApp:</span> <strong>{{ stats.whatsapp }}</strong> |
                        <span class="label">SMS:</span> <strong>{{ stats.sms }}</strong>
                    </p>
                    <p>
                        <span class="label">Last Communication: </span>
                        <strong>{{ stats.lastCommunication }}</strong>
                    </p>
                    <p>
                        <span class="label">
                            Best Channel to Communicate With:
                        </span>
                        <strong>{{ stats.bestChannel }}</strong>
                    </p>
                </div>
            </div>
            <div class="summary-card">
                <h3>Summarised Communication Content</h3>
                <div class="content-summary">
                    <p>
                        <span class="label">Client wants</span> <strong>{{ summary.wants }}</strong>
                    </p>
                    <p>
                        <span class="label">By</span> <strong>{{ summary.by }}</strong>
                    </p>
                    <p>
                        <span class="label">Under Constraints </span>
                        <strong>{{ summary.constraints }}</strong>
                    </p>
                </div>
            </div>
        </div>


        <div class="details-section">
            <h3 class="section-title">Sentiment Per Communication Channel</h3>
            <div class="channels">
                <div class="channel-card all-channels">
                    <div class="channel-header">
                        <span>All Channels</span>
                        <img src="/add-square.svg" alt="Add" />
                    </div>
                    <div class="all-icons">
                        <img src="/linkedin.svg" :style="{ backgroundColor: '#007EBB' }" />
                        <img src="/mail.svg" :style="{ backgroundColor: '#fff' }" />
                        <img src="/whatsApp.svg" :style="{ backgroundColor: '#44C654' }" />
                        <span>+ 5 more</span>
                    </div>
                </div>
                <div v-for="channel in channels" :key="channel.key" class="channel-card"
                    :class="{ active: channel.active, [channel.key.toLowerCase()]: true }">
                    <div class="channel-header">
                        <span>{{ channel.name }}</span>
                        <div class="channel-icons">
                            <img :src="channel.trash" class="trash-icon" />
                        </div>
                    </div>
                    <div class="channel-info-container">
                        <div class="channel-info-container-left">
                            <p class="channel-info">Last Interaction</p>
                            <p class="channel-date">{{ channel.date }}</p>
                        </div>
                        <div class="channel-info-container-right" :style="{ backgroundColor: channel.iconBackground }">
                            <img :src="channel.icon" class="main-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="sentiment-bar">
                <div class="sentiment-bar-item">
                    <span class="dot positive"></span> Positive
                </div>
                <div class="sentiment-bar-item">
                    <span class="dot neutral"></span> Neutral
                </div>
                <div class="sentiment-bar-item">
                    <span class="dot negative"></span> Negative
                </div>
            </div>
        </div>
    </section>





</template>

<script>

export default {
    name: 'ClientRequestSummary',
    props: {
        stats: {
            type: Object,
            default: () => ({
                emails: 15,
                whatsapp: 20,
                sms: 5,
                lastCommunication: 'Pratik Zala (June 17, 12:05pm)',
                bestChannel: 'WhatsApp',
            }),
        },
        summary: {
            type: Object,
            default: () => ({
                wants: 'Draft and review a Non-Disclosure Agreement (NDA) for a potential investor, including a tailored template and a legal review ensuring compliance with U.S. federal and California state laws.',
                by: 'Initial draft by Friday, June 21, 2025; Final version ready for signature by Monday, June 24, 2025.',
                constraints: 'Tailored for early-stage fundraising, compliant with U.S. federal and California state laws, includes IP protection, non-compete limitations, a 2-year confidentiality period, consideration for bi-jurisdictional enforceability (New York investor), and plain English wording suitable for non-legal professionals.',
            }),
        },
    },
    data() {
        return {
            channels: [
                { key: 'email', name: 'Email (15)', date: '12 Jan 2025', icon: '/mail.svg', active: true, trash: '/trash.svg', iconBackground: '#fff' },
                { key: 'whatsapp', name: 'WhatsApp (02)', date: '12 Jan 2025', icon: '/whatsApp.svg', active: false, trash: '/trash.svg', iconBackground: '#44C654' },
                { key: 'calls', name: 'Calls (05)', date: '12 Jan 2025', icon: '/phone.svg', active: false, trash: '/trash.svg', iconBackground: '#fff' },
                { key: 'linkedin', name: 'LinkedIn (01)', date: '12 Jan 2025', icon: '/linkedin.svg', active: false, trash: '/trash.svg', iconBackground: '#007EBB' },
            ],
        }
    }
}
</script>


<style scoped>
.client-summary {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 40px;
    margin-top: 20px;
}

.client-summary h2 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
}

.summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
}

.summary-card {
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 0;
}

.summary-card h3 {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 16px;
    padding: 16px 16px 8px;
    border-bottom: 1px solid #e5e5e5;
}

.stats-content,
.content-summary {
    padding: 0 16px 16px;
}

.stats-content p,
.content-summary p {
    margin-bottom: 12px;
    font-size: 14px;
}

.label {
    color: #5a5a5a;
}

.communication-header {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
}

.communication-channels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.channel-card {
    border-radius: 12px;
    padding: 12px;
    position: relative;
    height: 6rem;
}

.channel-card.all-channels {
    background: #FFF8E1;
}

.channel-card.email {
    background: #FFF8E1;
}

.channel-card.whatsapp {
    background: #e6f4ea;
}

.channel-card.calls.danger {
    background: #fde8e8;
}

.channel-card.linkedin {
    background: #e6f4ea;
}

.channel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

.channel-header span {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
}

.channel-icon {
    width: 32px;
    height: 32px;
    border-radius: 4.571px;
    border: 0.571px solid #e5e5e5;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.channel-icon.whatsapp-icon {
    background: #44c654;
}

.channel-icon.linkedin-icon {
    background: #007ebb;
}

.channel-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-label {
    font-size: 12px;
    color: #5a5a5a;
}

.detail-value {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
}

.channel-icons {
    display: flex;
    gap: 4px;
    margin-bottom: 8px;
}

.mini-icon {
    width: 32px;
    height: 32px;
    border-radius: 4.571px;
    border: 0.571px solid #e5e5e5;
    background: #ffffff;
}

.mini-icon.linkedin {
    background: #007ebb;
}

.mini-icon.whatsapp {
    background: #44c654;
}

.mini-icon.telegram {
    background: #1d93d2;
}

.more-link {
    font-size: 12px;
    color: #3b4d9b;
    text-decoration: underline;
}

.sentiment-legend {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
}

.sentiment-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.sentiment-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.sentiment-dot.sad {
    background: #D32F2F;
}

.sentiment-dot.moderate {
    background: #F57C00;
}

.sentiment-dot.happy {
    background: #2E7D32;
}


/* Details Section */

.section-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.channels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.channel-card {
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.channel-card.whatsapp {
    background-color: #E6F4EA;
}

.channel-card.calls {
    background-color: #FDE8E8;
}

.channel-card.linkedin {
    background-color: #E6F4EA;
}


.channel-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.channel-info-container-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.channel-info-container-right {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
}


.channel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
}

.channel-icons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.main-icon {
    height: 24px;
    width: 24px;
}

.trash-icon {
    cursor: pointer;
}


.channel-info {
    font-size: 12px;
    font-weight: 400;
    color: #6B7280;
}

.channel-date {
    font-weight: 500;
    font-size: 14px;
}

.all-channels {
    background-color: #EBEFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.all-channels .all-icons {
    display: flex;
    align-items: center;
}

.all-channels .all-icons img {
    border-radius: 6px;
    padding: 4px;
    height: 24px;
    width: 24px;
}

.all-channels .all-icons span {
    font-size: 0.75rem;
    color: #4A6DFF;
    font-weight: 500;
}

.sentiment-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 14px;
}

.sentiment-bar-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
}

.positive {
    background-color: #2E7D32;
}

.neutral {
    background-color: #F57C00;
}

.negative {
    background-color: #D32F2F;
}
</style>
