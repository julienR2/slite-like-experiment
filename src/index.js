let storage = {};
const componentManager = new ComponentManager();

const toggleLike = id => () => {
  storage[id] = storage[id] ? 0 : 1;
  componentManager.triggerUpdate(id);
}

function main() {
  const nodeList = $('.ReactVirtualized__Grid__innerScrollContainer');
  nodeList.children('div').each(function(index) {
    const noteRef = $(this).find('a');

    if (!noteRef || !noteRef.attr('href')) {
      return;
    }

    const href = noteRef.attr('href').split('/');
    const id = href[href.length - 1];

    const $noteRow = $(this).find('.note-row');
    const $buttonContainer = $('<div class="like_button_container"></div>');
    $noteRow.append($buttonContainer);

    const likeButtonComponent = ReactDOM.render(
      React.createElement(LikeButton, {
        noteId: id,
        storage,
        onToggleLike: toggleLike(id),
      }),
      $buttonContainer[0],
    );

    componentManager.registerComponent(id, likeButtonComponent);
  });
}

setTimeout(() => {
  main();

  const sidepanel = $('.sidepanel');
  sidepanel.bind("DOMSubtreeModified", function(e) {
    if ($(event.target).hasClass('ReactVirtualized__Grid')) {
      main();
    }
  });
}, 3000);
