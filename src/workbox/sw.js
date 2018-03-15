importScripts('workbox-sw.js');
importScripts('workbox-background-sync.js');

const workboxSW = new WorkboxSW();

workboxSW.precache([]);

let bgQueue = new workbox.backgroundSync.QueuePlugin({
    callbacks: {
        replayDidSucceed: async(hash, res) => {
            self.registration.showNotification('Background sync demo', {
                body: 'Burger App Updated!'
            });
        }
    }
});

workboxSW.router.registerRoute('https://react-my-burger-46141.firebaseio.com/orders.json?auth=*',
    workboxSW.strategies.networkOnly({plugins: [bgQueue]}), 'POST'
);