// 둥근 모서리에 옅은 그림자...
import './Card.css';

const Card = props => {
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
};
export default Card;
