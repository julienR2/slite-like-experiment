class ComponentManager {
  constructor() {
    this.noteLikes = {};
    this.toolbarLike = null;
  }

  triggerUpdate = id => {
    this.noteLikes[id].forceUpdate();

    if (!!this.toolbarLike) {
      this.toolbarLike.forceUpdate();
    }
  }

  registerNoteLike = (id, component) => {
    this.noteLikes[id] = component;
  }

  registerToolbarLike = (component) => {
    this.toolbarLike = component;
  }
}
