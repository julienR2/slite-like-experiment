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

  // When the store change we update the component related to this part of the storage
  // This is to simulate roughly a redux store and a component being updated when the part
  // of the store it is attached changes
  componentManager.triggerUpdate(id);
}

// Simulate initial content
const initStorage = (id) => {
  if (!storage[id]) {
    // Randomely attribute true/false value
    const liked = !!getRandomInt(0, 1);

    // Randomely attribute a count depending on the initial liked value
    storage[id] = {
      liked,
      count: getRandomInt((liked ? 1 : 0), 5),
    }
  }
}

// Set up like button on each note from the channel list
function noteLikeButtons() {
  // get the note list
  const noteList = $('.ReactVirtualized__Grid__innerScrollContainer');

  noteList.children('div').each(function(index) {
    const noteRef = $(this).find('a');

    // if no href, it's probably not a note
    if (!noteRef || !noteRef.attr('href')) {
      return;
    }

    const href = noteRef.attr('href').split('/');
    const id = href[href.length - 1];

    // Init the storage if not already done
    initStorage(id);

    const $noteRow = $(this).find('.note-row');

    // Append the container of the LikeButton to the HTML
    const $buttonContainer = $('<div class="note-like"></div>');
    $noteRow.append($buttonContainer);

    // Create a LikeButton Component and attach it to the previously created container
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

// Set up like button in the toolbar
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

// Wait for the content to load before setting event
setTimeout(() => {
  noteLikeButtons();
  toolBarLikeButton();

  const sidepanel = $('.sidepanel');

  // When the channel bar change, update the like button
  // This allow to run the script on URL change
  sidepanel.bind("DOMSubtreeModified", function(event) {
    if ($(event.target).hasClass('ReactVirtualized__Grid')) {
      noteLikeButtons();
      toolBarLikeButton();
    }
  });

  const $toolbar = $('.note-view');

  // When the note view change, update the like button in the toolbar
  // It update the like button when navigating to a note detail
  $toolbar.bind("DOMSubtreeModified", function(event) {
    if ($(event.target).hasClass('shade-00-on-hover')) {
      toolBarLikeButton();
    }
  });
}, 2000);
