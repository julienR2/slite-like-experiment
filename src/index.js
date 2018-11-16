function main() {
  let nodeList = $('.ReactVirtualized__Grid__innerScrollContainer');

  nodeList.children('div').each(function(index) {
    const $noteRow = $(this).find('.note-row');
    const $buttonContainer = $('<div class="like_button_container"></div>');
    $noteRow.append($buttonContainer);

    ReactDOM.render(React.createElement(LikeButton), $buttonContainer[0]);
  });
}

setTimeout(main, 3000);
