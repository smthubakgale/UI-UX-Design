function clearSections() {
  document.querySelectorAll('section').forEach((section) => {
    section.innerHTML = '';
  });
}

function addSectionId(css, sectionId) {
  var rules = css.split('}');
  var modifiedRules = [] ;

  rules.forEach(function(rule) {
    var selectorMatch = rule.match(/([^{]+)/);
    if (selectorMatch) {
      var selector = selectorMatch[1].trim();
      var modifiedSelector = `
`     + `#${sectionId} ${selector}`;

      console.log(modifiedSelector);
      console.log(modifiedSelector + rule.substring(selector.length) + '}');
      modifiedRules.push(modifiedSelector + rule.substring(selector.length) + '}');
    }
  });

  return modifiedRules.join('').replace('body' , '');
}

function loadPage(pageUrl) {
  clearSections();

  fetch(pageUrl)
.then((response) => response.text())
.then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('link');
    const scripts = doc.querySelectorAll('script');
    const pageContent = doc.body.innerHTML;

    // Remove existing styles and scripts
    const existingStyles = document.querySelectorAll('style');
    existingStyles.forEach(style => style.remove());
    const existingScripts = document.querySelectorAll('script');
    existingScripts.forEach(script => script.remove());

    // Load page-specific CSS, HTML, and JS
    const pageName = pageUrl.replace('.html', '').replace('subs/', '');
    const sectionId = `${pageName}-page`;
    const section = document.getElementById(sectionId);

    // Add CSS
    links.forEach(link => {
      if (link.getAttribute('rel') === 'stylesheet' && link.getAttribute('href').endsWith('.css')) {
        const href = link.getAttribute('href').replace('../', '');
        
        console.log(href);
        
        fetch(href)
.then(response => response.text())
.then(css => {
          const modifiedCss = addSectionId(css.trim(), sectionId);
          const newStyle = document.createElement('style');
          newStyle.textContent = modifiedCss;
          section.appendChild(newStyle);
        })
.catch(error => console.error(`Error loading CSS: ${error}`));
      }
    });

    // Add HTML
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = pageContent;
    section.appendChild(contentDiv);

    // Add JS
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src.replace('../', '');
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
loadPage('subs/page1.html');
