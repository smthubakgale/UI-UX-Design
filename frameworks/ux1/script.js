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
  return   jsCode.replace(/(document\.querySelector|document\.querySelectorAll|jQuery|[$])\s*\(\s*["'](#|\.|)([a-zA-Z0-9_-]+)["']\s*\)/g, (match, p1, p2, p3) => {
    return `${p1}('#${sectionId} ${p2}${p3}')`;
  });
}


function loadPage(pageUrl) {
  clearSections();

  fetch(pageUrl)
.then((response) => response.text())
.then((html) => {
    // Select all section elements
       const sections = document.querySelectorAll('section'); 
    // Loop through each section
       sections.forEach(section => 
       {
            // Select all style and script elements within the section
               const stylesAndScripts = section.querySelectorAll('style, script');
      
            // Remove each style and script element
               stylesAndScripts.forEach(element => element.remove());
        });
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('link');
    const styles = doc.querySelectorAll('style');
    const scripts = doc.querySelectorAll('script');
    const pageContent = doc.body.innerHTML
        .replace(/<script>.*?<\/script>/g, '') // Remove script tags
        .replace(/<style>.*?<\/style>/g, '') // Remove style tags
        .replace(/<link.*?rel="stylesheet".*?>/g, ''); // Remove CSS links

    // Load page-specific CSS, HTML, and JS
    const pageName = pageUrl.replace('.html', '').replace('subs/', '');
    const sectionId = `${pageName}-page`;
    const section = document.getElementById(sectionId);

    // Add CSS
    styles.forEach(style =>{
       const htm = style.innerHTML;
       console.log(htm);
       if(htm){
         const css = htm;
         const modifiedCss = addSectionId(css.trim(), sectionId);
         const newStyle = document.createElement('style');
         newStyle.textContent = modifiedCss;
         section.appendChild(newStyle);
       }
    });
    links.forEach(link => {
      if (link.getAttribute('rel') === 'stylesheet' && link.getAttribute('href').endsWith('.css')) {
        const href = link.getAttribute('href').replace('../', '');
        if(href){
          fetch(href)
          .then(response => response.text())
          .then(css =>
          {
              const modifiedCss = addSectionId(css.trim(), sectionId);
              const newStyle = document.createElement('style');
              newStyle.textContent = modifiedCss;
              section.appendChild(newStyle);
          })
          .catch(error => console.error(`Error loading CSS: ${error}`));
          
        }
      }
    });

    // Add HTML
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = pageContent;
  
    const stylesAndScripts2 = contentDiv.querySelectorAll('style, script'); 
    stylesAndScripts2.forEach(element => element.remove());
    
     section.appendChild(contentDiv);

    // Add JS
    scripts.forEach(script => {
      let src = script.getAttribute('src');
      const htm = script.innerHTML;
      console.log(htm , src);
      if(htm){
        const jsCode = htm;
        const modifiedJsCode = addSectionIdToJs(jsCode, sectionId); 
        const modifiedScript = document.createElement('script');
        modifiedScript.textContent = modifiedJsCode;
        section.appendChild(modifiedScript);
      }
      else if(src)
      { 
          src = src.replace('../', ''); 
        
          fetch(src)
          .then(response => response.text())
          .then(jsCode => {
              const modifiedJsCode = addSectionIdToJs(jsCode, sectionId); 
              const modifiedScript = document.createElement('script');
              modifiedScript.textContent = modifiedJsCode;
              section.appendChild(modifiedScript);
            })
          .catch(error => console.error(`Error loading JS: ${error}`));
          }
      
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
loadPage('page3.html');
