class ComponentManager {
  constructor() {
    this.noteLikes = {};
    this.toolbarLike = null;
  }

  triggerUpdate = id => {
    console.log('triggerUpdate', id);
    console.log('this.noteLikes', this.noteLikes);
    this.noteLikes[id].forceUpdate();

    console.log('this.toolbarLike', this.toolbarLike);
    if (!!this.toolbarLike) {
      this.toolbarLike.forceUpdate();
    }
  }

  registerNoteLike = (id, component) => {
    console.log('register note', id, component);
    this.noteLikes[id] = component;
  }

  registerToolbarLike = (component) => {
    console.log('register component', component);
    this.toolbarLike = component;
  }
}
