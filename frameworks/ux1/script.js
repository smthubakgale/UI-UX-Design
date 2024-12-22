function clearSections() {
    document.querySelectorAll('section').forEach((section) => {
        section.innerHTML = '';
    });
}

function loadPage(pageUrl) {
    clearSections(); 

    fetch(pageUrl)
.then((response) => response.text())
.then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const styles = doc.querySelectorAll('link');
            const scripts = doc.querySelectorAll('script');
            const pageContent = doc.body.innerHTML;

            // Remove existing styles and scripts
            const existingStyles = document.querySelectorAll('link');
            existingStyles.forEach(style => style.remove());
            const existingScripts = document.querySelectorAll('script');
            existingScripts.forEach(script => script.remove());

            // Load page-specific CSS, HTML, and JS
            const pageName = pageUrl.replace('.html', '').replace('subs/', '');
            const sectionId = `${pageName}-page`;
            const section = document.getElementById(sectionId);

            // Add CSS
            styles.forEach(style => {
                const newStyle = document.createElement('link');
                newStyle.rel = 'stylesheet';
                newStyle.href = style.href;
                section.appendChild(newStyle);
            });

            // Add HTML
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = pageContent;
            section.appendChild(contentDiv);

            // Add JS
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                section.appendChild(newScript);
            });
        })
.catch((error) => console.error(error));
}

const menuLinks = document.querySelectorAll('#menu a');
    
menuLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const pageUrl = link.getAttribute('data-page');
        loadPage(pageUrl);
    });
});

// Load home page by default
loadPage('home.html');
