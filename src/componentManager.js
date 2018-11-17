class ComponentManager {
  constructor() {
    this.components = [];
  }

  triggerUpdate = id => {
    console.log('this.components', this.components);
    this.components[id].map(component => component.forceUpdate())
  };

  registerComponent = (id, component) => {
    this.components[id] = [
      component,
      ...(this.components[id] || []),
    ];
  }
}
