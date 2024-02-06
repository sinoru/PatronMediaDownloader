import * as Store from '../common/store.mjs';

async function updateBody() {
    let tabs = await browser.tabs.query({ 
        active: true,
        currentWindow: true
    });

    let originURL = tabs[0].url;

    const data = await Store.get(originURL);
    const media = data['media'];

    let downloadAllButton = document.createElement('button');
    downloadAllButton.textContent = `Download all media ${media.length}`;
    downloadAllButton.addEventListener('click', () => {
        browser.runtime.sendMessage({'media': media, 'url': originURL});
        window.close();
    });

    document.body.replaceChildren(downloadAllButton);
}

Store.onChanged.addListener(() => updateBody);
updateBody();
