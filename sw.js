const paths = ["index.html","other.html","css/style.css","js/main.js"]
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open("appTest")
        .then((cache) =>{
            cache.addAll(paths)
    }).catch(err => console.log(err))
)})

self.addEventListener('activate',()=>{
    console.log("we are in activated phase");
})
self.addEventListener('fetch',(event)=>{
    console.log("Network Request:",event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then((file) =>{
            if(file){
                console.log("Found in cache");
                return file }
        console.log("Not found in cache");
        return fetch(event.request.url)
    })
    .catch((err) => console.log(err))
)})