class InfiniteScroll {
  constructor (path, wrapperSelector, category) {
      if (path === undefined || wrapperSelector === undefined || category === undefined) throw Error ('no parameter.');
      this.path = path;
      this.pNum = 2;
      this.wNode = document.querySelector(`${wrapperSelector}`);
      this.wrapperSelector = wrapperSelector;
      this.enable = true;
      this.category = category;

      this.detectScroll();
  }

  detectScroll() {
      window.onscroll = (ev) => {
          if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) 
              this.getNewPost();
      };    
  }
  async getNewPost() {
      if (this.enable === false) return false;
      this.enable = false;
      const response = await fetch(`${location.origin + this.category + this.path + this.pNum}/`);
      if(response.ok) {
          const responseText = await response.text();
          const childItems = this.getChildItemsByAjaxHTML(responseText);
          this.appendNewItems(childItems);
          this.pNum++;
          return this.enable = true;                                
      }
      else{
          console.log('hi');
      }
  }

  getChildItemsByAjaxHTML(HTMLText) {
      const newHTML = document.createElement('html');
      newHTML.innerHTML = HTMLText;
      const childItems = newHTML.querySelectorAll(`${this.wrapperSelector} > *`);
      return childItems;
  }

  appendNewItems(items) {
      items.forEach(item => {
          this.wNode.appendChild(item);
      });
  }
}