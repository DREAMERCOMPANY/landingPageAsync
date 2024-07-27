const API = 'https://youtube-v38.p.rapidapi.com/channel/videos/?id=UC4Ge3cqrdyOszmnJTcMICcg&filter=videos_latest&hl=en&gl=US';

const content = document.getElementById('content');
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '0fb235399fmshd88efd78ba4a8e0p137b4fjsn089b31bbfc0b',
        'x-rapidapi-host': 'youtube-v38.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const data = await fetchData(API);
        console.log(data);  // Inspecciona la estructura del objeto JSON devuelto

        // Asegúrate de que 'contents' existe y es un array
        if (data.contents && Array.isArray(data.contents)) {
            let view = `
                ${data.contents.map(item => `
                    <div class="group relative">
                        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${item.video.thumbnails[0].url}" alt="${item.video.title}" class="w-full" />
                        </div>
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${item.video.title}
                            </h3>
                        </div>
                    </div>
                `).slice(0, 3).join('')}
            `;
            content.innerHTML = view;
        } else {
            console.error('No videos found');
        }
    } catch (error) {
        console.log(error);
    }
})();
