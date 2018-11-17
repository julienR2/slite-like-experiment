class ComponentManager {
  constructor() {
    this.components = {};
  }

  triggerUpdate = id => this.components[id].forceUpdate()

  registerComponent = (id, component) => {
    this.components[id] = component;
  }
}
