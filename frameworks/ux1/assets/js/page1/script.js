const page1 = {
  myFunction: () => {
    console.log("Welcome to Page 1!");
  },
  
  init: () => {
    document.querySelector(".page1 h1").addEventListener("click", page1.myFunction);
  }
};

// Initialize the page
page1.init();
