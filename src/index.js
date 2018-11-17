let storage = {};
const componentManager = new ComponentManager();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const toggleLike = id => () => {
  const { liked, count } = storage[id];

  storage[id] = {
    liked: !liked,
    count: liked ? count - 1 : count + 1,
  };
  componentManager.triggerUpdate(id);
}

const initStorage = (id) => {
  if (!storage[id]) {
    const liked = !!getRandomInt(0, 1);

    storage[id] = {
      liked,
      count: getRandomInt((liked ? 1 : 0), 5),
    }
  }
}

function noteLikeButtons() {
  const nodeList = $('.ReactVirtualized__Grid__innerScrollContainer');
  nodeList.children('div').each(function(index) {
    const noteRef = $(this).find('a');

    if (!noteRef || !noteRef.attr('href')) {
      return;
    }

    const href = noteRef.attr('href').split('/');
    const id = href[href.length - 1];

    initStorage(id);

    const $noteRow = $(this).find('.note-row');
    const $buttonContainer = $('<div class="note-like"></div>');
    $noteRow.append($buttonContainer);

    const noteLikeComponent = ReactDOM.render(
      React.createElement(LikeButton, {
        noteId: id,
        storage,
      }),
      $buttonContainer[0],
    );

    componentManager.registerNoteLike(id, noteLikeComponent);
  });
}

function toolBarLikeButton() {
  $('.toolbar-like').remove();
  const $toolbarButton = $('.note-view .height-full .flexbox-grow .center-text');
  const $buttonContainer = $('<div class="toolbar-like"></div>');
  $buttonContainer.insertAfter($toolbarButton);

  const href = window.location.href.split('/');
  const id = href[href.length - 1];

  initStorage(id);

  const toolbarLikeComponent = ReactDOM.render(
    React.createElement(LikeButton, {
      noteId: id,
      storage,
      onToggleLike: toggleLike(id),
    }),
    $buttonContainer[0],
  );

  componentManager.registerToolbarLike(toolbarLikeComponent);
}

setTimeout(() => {
  noteLikeButtons();
  toolBarLikeButton();

  const sidepanel = $('.sidepanel');

  sidepanel.bind("DOMSubtreeModified", function(event) {
    if ($(event.target).hasClass('ReactVirtualized__Grid')) {
      noteLikeButtons();
      toolBarLikeButton();
    }
  });

  const $toolbar = $('.note-view');

  $toolbar.bind("DOMSubtreeModified", function(event) {
    if ($(event.target).hasClass('shade-00-on-hover')) {
      toolBarLikeButton();
    }
  });
}, 2000);
