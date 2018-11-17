'use strict';

class LikeButton extends React.Component {
  static propTypes = {
    noteId: PropTypes.string,
    storage: PropTypes.object,
    onToggleLike: PropTypes.func,
  }

  render() {
    const { noteId, storage, onToggleLike } = this.props;
    const { liked, count } = storage[noteId];

    return React.createElement(
      'div',
      {
        onClick: onToggleLike,
        style: styles.wrapper,
      },
      React.createElement(
        'i',
        {
          className: 'material-icons',
          style: {
            ...styles.icon,
            ...(liked && styles.iconLiked || {}),
          },
        },
        'thumb_up'
      ),
      React.createElement(
        'p',
        {
          style: {
            ...styles.count,
            ...(!count && styles.countNull || {}),
          },
        },
        count
      ),
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '14px',
    color: '#cccccc',
  },
  iconLiked: {
    color: '#ff486b',
  },
  count: {
    fontSize: '12px',
    color: '#cccccc',
    marginLeft: '4px',
  },
  countNull: {
    display: 'none',
  },
}
