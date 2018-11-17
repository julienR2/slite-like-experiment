'use strict';

class LikeButton extends React.Component {
  static propTypes = {
    noteId: PropTypes.string,
    storage: PropTypes.object,
    onToggleLike: PropTypes.func,
  }

  render() {
    const { noteId, storage, onToggleLike } = this.props;

    return React.createElement(
      'i',
      {
        onClick: onToggleLike,
        className: 'material-icons',
        style: {
          ...styles.icon,
          ...(!!storage[noteId] && styles.iconLiked || {}),
        },
      },
      'thumb_up'
    );
  }
}

const styles = {
  icon: {
    fontSize: '14px',
    color: '#cccccc',
  },
  iconLiked: {
    color: '#ff486b',
  },
}
