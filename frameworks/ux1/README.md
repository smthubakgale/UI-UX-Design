Here is the Markdown code:
Menu-Based Page Loader
=====================================
Overview
------------
This project demonstrates a menu-based page loader that loads different pages based on the menu item clicked.
Features
------------
Menu-based page loader
Dynamic page loading using JavaScript and the Fetch API
Bootstrap styling and layout
Tooltips, popovers, toasts, and overlays on each page
Code Structure
------------------
index.html: The main HTML file that contains the menu and page loader
page1.html, page2.html, page3.html: The individual pages that are loaded dynamically
styles.css: The CSS file that styles the pages using Bootstrap
How it Works
------------------
The user clicks on a menu item in index.html.
The corresponding page (e.g. page1.html) is loaded dynamically using JavaScript and the Fetch API.
The loaded page is inserted into the #container element in index.html.
The page is styled using Bootstrap, and tooltips, popovers, toasts, and overlays are displayed as needed.
Key Code Snippets
------------------------
index.html
```
<!-- Menu -->
<ul id="menu">
  <li><a href="#" data-page="page1.html">Page 1</a></li>
  <li><a href="#" data-page="page2.html">Page 2</a></li>
  <li><a href="#" data-page="page3.html">Page 3</a></li>
</ul>

<!-- Page loader -->
<div id="container"></div>

<!-- JavaScript code to load pages dynamically -->
<script>
  const menuLinks = document.querySelectorAll('#menu a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const pageUrl = link.getAttribute('data-page');
      loadPage(pageUrl);
    });
  });
  
  function loadPage(pageUrl) {
    fetch(pageUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const styles = doc.querySelectorAll('style');
        const scripts = doc.querySelectorAll('script');
        
        // Remove existing styles and scripts
        const existingStyles = document.querySelectorAll('style');
        existingStyles.forEach(style => style.remove());
        const existingScripts = document.querySelectorAll('script');
        existingScripts.forEach(script => script.remove());
        
        // Load page-specific CSS and JS
        styles.forEach(style => {
          const newStyle = document.createElement('style');
          newStyle.textContent = style.textContent;
          document.head.appendChild(newStyle);
        });
        
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        });
        
        // Add the HTML content to the container
        const container = document.getElementById('container');
        container.innerHTML = doc.body.innerHTML;
      });
  }
</script>
```
page1.html
```
<!-- Tooltip -->
<span class="tooltip">Hover over me!
  <span class="tooltiptext">This is a tooltip!</span>
</span>

<!-- Popover -->
<button class="btn btn-secondary" data-toggle="popover" data-placement="top" title="Popover title" data-content="This is a popover!">Click me!</button>

<!-- Toast -->
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">Toast title</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    This is a toast!
  </div>
</div>

<!-- Overlay -->
<button class="btn btn-secondary" data-toggle="modal" data-target="#overlayModal">Click me!</button>

<div class="modal fade" id="overlayModal" tabindex="-1" role="dialog" aria-labelledby="overlayModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="overlayModalLabel">Overlay title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        This is an overlay!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close

```
page2.html
```
HTML
<!-- Tooltip -->
<span class="tooltip">Hover over me!
  <span class="tooltiptext">This is a tooltip!</span>
</span>

<!-- Popover -->
<button class="btn btn-secondary" data-toggle="popover" data-placement="top" title="Popover title" data-content="This is a popover!">Click me!</button>

<!-- Toast -->
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">Toast title</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    This is a toast!
  </div>
</div>

<!-- Overlay -->
<button class="btn btn-secondary" data-toggle="modal" data-target="#overlayModal">Click me!</button>

<div class="modal fade" id="overlayModal" tabindex="-1" role="dialog" aria-labelledby="overlayModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="overlayModalLabel">Overlay title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        This is an overlay!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

```
page3.html

```
<!-- Tooltip -->
<span class="tooltip">Hover over me!
  <span class="tooltiptext">This is a tooltip!</span>
</span>

<!-- Popover -->
<button class="btn btn-secondary" data-toggle="popover" data-placement="top" title="Popover title" data-content="This is a popover!">Click me!</button>

<!-- Toast -->
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">Toast title</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    This is a toast!
  </div>
</div>

<!-- Overlay -->
<button class="btn btn-secondary" data-toggle="modal" data-target="#overlayModal">Click me!</button>

<div class="modal fade" id="overlayModal" tabindex="-1" role="dialog" aria-labelledby="overlayModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="overlayModalLabel">Overlay title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        This is an overlay!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

```
Conclusion
----------
This project demonstrates a menu-based page loader that loads different pages based on the menu 
item clicked. Each page includes a tooltip, popover, toast, and overlay. The pages are loaded 
dynamically using JavaScript and the Fetch API.
