import style from './skeleton.module.css';

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const Skeleton = () => {
  return (
    <ul className={style.skeletonContaine}>
      {numbers.map(index => (
        <li key={index} className={style.skeleton}>
          <div className={style.wrapper}>
            <div className={style.animation}></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
