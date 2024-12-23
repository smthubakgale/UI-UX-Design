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
`     + `#${sectionId} `;

      modifiedRules.push(modifiedSelector + rule.substring(selector.length) + '}');
    }
  });

  return modifiedRules.join('').replace('body' , '');
}
function addSectionIdToJs(jsCode, sectionId) {
  // Use regular expressions to find and modify query selectors
  return   jsCode.replace(/(document\.querySelector|document\.querySelectorAll|jQuery|[$])\s*\(\s*["'](#|\.)([a-zA-Z0-9_-]+)["']\s*\)/g, (match, p1, p2, p3) => {
    return `${p1}('#${sectionId} ${p2}${p3}')`;
  });
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
      const src = script.getAttribute('src') .replace('../', ''); 
      console.log(src);
      //const newScript = document.createElement('script');
      //newScript.src = src;
      //section.appendChild(newScript);
      // Modify JavaScript code
      fetch(src)
      .then(response => response.text())
      .then(jsCode => {
          const modifiedJsCode = addSectionIdToJs(jsCode, sectionId);
        console.log(jsCode,modifiedJsCode);
          const modifiedScript = document.createElement('script');
          modifiedScript.textContent = modifiedJsCode;
          section.appendChild(modifiedScript);
        })
      .catch(error => console.error(`Error loading JS: ${error}`));
      });
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
