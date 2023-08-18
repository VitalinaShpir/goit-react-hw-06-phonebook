import { getFilter } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import css from './Filter.module.css';

export const Filter = () => {

  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div className={css.searchBox}>
      <label className={css.searchicon}>
        <BsFillSearchHeartFill /></label>
        <input
        placeholder='Find contacts by name'
          className={css.searchInput}
          type="text"
          value={filter}
          onChange={event => dispatch(setFilter(event.target.value.trim()))}
        />
      
    </div>
  );
};
