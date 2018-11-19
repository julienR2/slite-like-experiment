// This class keeps track of the current existing component to be able to force their update when necessary
class ComponentManager {
  constructor() {
    this.noteLikes = {};
    this.toolbarLike = null;
  }

  triggerUpdate() {
    this.noteLikes[id].forceUpdate();

    if (!!this.toolbarLike) {
      this.toolbarLike.forceUpdate();
    }
  }

  registerNoteLike(id, component) {
    this.noteLikes[id] = component;
  }

  registerToolbarLike(component) {
    this.toolbarLike = component;
  }
}
