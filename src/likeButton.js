'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
    };
  }

  onToggle = () => this.setState(prevState => ({ liked: ! prevState.liked }))

  render() {
    const { liked } = this.state;

    return React.createElement(
      'i',
      {
        onClick: this.onToggle,
        className: 'material-icons',
        style: {
          ...styles.icon,
          ...(liked && styles.iconLiked || {}),
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
