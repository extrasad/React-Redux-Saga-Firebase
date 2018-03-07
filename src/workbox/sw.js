importScripts('workbox-sw.js');
importScripts('workbox-background-sync.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);

let bgQueue = new workbox.backgroundSync.QueuePlugin({
    callbacks: {
        replayDidSucceed: async(hash, res) => {
            self.registration.showNotification('Background sync demo', {
                body: 'Events have been updated!'
            });
        }
    }
});

workboxSW.router.registerRoute('/api/add',
    workboxSW.strategies.networkOnly({plugins: [bgQueue]}), 'POST'
);

workboxSW.router.registerRoute('/api/getAll', () => {
    return bgQueue.replayRequests().then(() => {
        return fetch('/api/getAll');
    }).catch(err => {
        return err;
    });
});